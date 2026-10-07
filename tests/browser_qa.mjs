import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = process.env.E2E_URL || 'http://127.0.0.1:4173';
const outDir = process.env.QA_OUT_DIR || '';

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

async function whiteSurfaces(page) {
  const selectors = [
    'body',
    '.header',
    '.section-soft',
    '.section-dark',
    '.choice-section',
    '.gallery-section',
    '.booking-concise',
    '.footer'
  ];
  const results = await page.evaluate((items) => items.flatMap(selector => {
    const el = document.querySelector(selector);
    if (!el) return [];
    return [[selector, getComputedStyle(el).backgroundColor]];
  }), selectors);
  for (const [selector, color] of results) {
    invariant(color === 'rgb(255, 255, 255)', `${selector} is not white: ${color}`);
  }
}

async function noHorizontalOverflow(page, label) {
  const dims = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth
  }));
  invariant(dims.scrollWidth <= dims.innerWidth + 1, `${label}: document horizontal overflow ${JSON.stringify(dims)}`);
  invariant(dims.bodyScrollWidth <= dims.innerWidth + 1, `${label}: body horizontal overflow ${JSON.stringify(dims)}`);
}

async function desktopQA(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  await whiteSurfaces(page);
  await noHorizontalOverflow(page, 'desktop');

  const heroBox = await page.locator('.hero').boundingBox();
  invariant(heroBox && heroBox.height >= 700, `desktop hero too short: ${heroBox?.height}`);

  const menuToggle = page.locator('[data-menu-toggle]');
  await menuToggle.click();
  invariant(await menuToggle.getAttribute('aria-expanded') === 'true', 'menu aria-expanded did not become true');
  invariant(await page.locator('[data-menu-overlay]').isVisible(), 'menu overlay did not become visible');
  await page.keyboard.press('Escape');
  invariant(await menuToggle.getAttribute('aria-expanded') === 'false', 'menu aria-expanded did not reset');
  invariant(await page.locator('[data-menu-overlay]').isHidden(), 'menu overlay did not close');
  invariant(await menuToggle.evaluate(el => el === document.activeElement), 'focus did not return to menu toggle');

  const firstCard = page.locator('.treatment-visual').first();
  await firstCard.locator('.treatment-media').hover();
  await page.waitForTimeout(350);
  const revealOpacity = await firstCard.locator('.treatment-meta').evaluate(el => getComputedStyle(el).opacity);
  invariant(Number(revealOpacity) > 0.9, `desktop treatment metadata did not reveal: ${revealOpacity}`);

  await firstCard.locator('.treatment-media').focus();
  invariant(await firstCard.getAttribute('aria-expanded') === 'true', 'keyboard focus did not expand treatment state');

  const faq = page.locator('.faq-question').first();
  await faq.click();
  invariant(await faq.getAttribute('aria-expanded') === 'true', 'FAQ did not expand');

  const bookingHref = await page.locator('.hero-actions .btn').getAttribute('href');
  invariant(Boolean(bookingHref?.includes('salonized.com')), `booking destination changed: ${bookingHref}`);

  const choice = page.locator('.choice-option').first();
  const before = await page.locator('#choiceProgressText').textContent();
  await choice.click();
  const after = await page.locator('#choiceProgressText').textContent();
  invariant(before !== after, `massage choice did not advance: ${before} -> ${after}`);

  invariant(await page.locator('.load-map').count() === 1, 'map consent control missing');

  if (outDir) {
    await fs.mkdir(outDir, { recursive: true });
    await page.screenshot({ path: path.join(outDir, 'desktop.png'), fullPage: true });
  }

  await context.close();
}

async function mobileLayoutQA(browser, width, height, label, runInteractions = false) {
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  await whiteSurfaces(page);
  await noHorizontalOverflow(page, label);

  const headerBox = await page.locator('.header').boundingBox();
  const heroBox = await page.locator('.hero').boundingBox();
  const trustBox = await page.locator('.trustbar').boundingBox();
  invariant(headerBox && Math.abs(headerBox.height - 72) <= 2, `${label}: header should be 72px, got ${headerBox?.height}`);
  invariant(heroBox && Math.abs(heroBox.height - (height - 72)) <= 3, `${label}: hero should fill first viewport below header: ${heroBox?.height} vs ${height - 72}`);
  invariant(trustBox && trustBox.y >= height - 2, `${label}: content after hero appears in first viewport at y=${trustBox?.y}`);

  const heroCTA = page.locator('.hero-actions .btn').first();
  const ctaBox = await heroCTA.boundingBox();
  invariant(ctaBox && ctaBox.y + ctaBox.height <= height + 1, `${label}: primary booking CTA falls below first viewport`);
  invariant(await page.locator('.hero-actions .text-link').isHidden(), `${label}: secondary hero action should be hidden on mobile`);
  invariant(await page.locator('.hero-location').isHidden(), `${label}: location should move below hero on mobile`);

  if (runInteractions) {
    const firstCard = page.locator('.treatment-visual').first();
    const media = firstCard.locator('.treatment-media');
    await media.tap();
    invariant(await firstCard.getAttribute('aria-expanded') === 'true', 'first treatment tap did not reveal card');
    invariant(await page.locator('#treatmentDialog').evaluate(el => !el.open), 'legacy treatment modal opened on first reveal tap');
    await page.waitForTimeout(450);

    const metaBox = await firstCard.locator('.treatment-meta').boundingBox();
    invariant(metaBox && metaBox.height > 0, 'mobile treatment metadata remains collapsed after first tap');

    const menuToggle = page.locator('[data-menu-toggle]');
    await menuToggle.tap();
    invariant(await page.locator('[data-menu-overlay]').isVisible(), 'mobile menu overlay did not open');
    const menuBox = await page.locator('[data-menu-overlay]').boundingBox();
    invariant(menuBox && menuBox.width <= width + 0.5, `mobile menu exceeds viewport: ${menuBox?.width}`);
    await page.locator('[data-menu-close]').tap();
  }

  if (outDir) {
    await fs.mkdir(outDir, { recursive: true });
    await page.screenshot({ path: path.join(outDir, `mobile-${width}x${height}.png`), fullPage: true });
  }

  await context.close();
}

const browser = await chromium.launch({ headless: true });
try {
  await desktopQA(browser);
  await mobileLayoutQA(browser, 360, 800, 'mobile-360x800');
  await mobileLayoutQA(browser, 390, 844, 'mobile-390x844', true);
  await mobileLayoutQA(browser, 430, 932, 'mobile-430x932');
  if (outDir) {
    await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify({ ok: true, url: baseURL, checked: ['desktop', 'mobile-360x800', 'mobile-390x844', 'mobile-430x932', 'viewport-hero', 'menu', 'touch-reveal', 'keyboard-reveal', 'faq', 'choice', 'booking-link', 'map-consent', 'white-surfaces', 'overflow'] }, null, 2));
  }
  console.log('Baitan browser QA passed');
} finally {
  await browser.close();
}
