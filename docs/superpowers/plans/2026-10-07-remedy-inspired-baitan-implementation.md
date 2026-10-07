# Remedy-inspired Baitan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Baitan Thai Massage presentation and interaction layer into a Remedy Place-inspired premium editorial experience while preserving all current business data, routes, SEO, Salonized booking, integrations and the all-white page-surface contract.

**Architecture:** Keep the current static Python generator and data sources. `build.py` continues to generate semantic markup from `data/site.json` and `data/treatments.json`; `index.template.html` remains the shell; top-level `styles.css` becomes the Remedy-inspired Baitan presentation layer; top-level `app.js` becomes the progressive-enhancement interaction layer while the proven base assets remain loaded beneath it. No framework rewrite, server-side app, database or new booking backend is introduced.

**Tech Stack:** Python 3.12 static generator, HTML, CSS, vanilla JavaScript, unittest, GitHub Actions, Render static hosting.

**Spec:** `docs/superpowers/specs/2026-10-07-remedy-inspired-baitan-design.md`

## Global Constraints

- Existing repository only: `KINZARE/baitanmassage`; do not rebuild from scratch.
- Preserve `data/site.json` and `data/treatments.json` as business-data sources of truth.
- Preserve Salonized as the production booking destination; QA never creates a real appointment.
- Preserve all canonical routes, SEO metadata, treatment facts, prices, contact details, gift-card behavior, legal pages, WhatsApp, map consent and working integrations.
- Every persistent page surface remains fully opaque `#FFFFFF`.
- Espresso/dark brown remains the primary text color; Clay `#B56F4C` remains the restrained primary action accent.
- No gradients, neon, glow-heavy styling, invented testimonials, fabricated business claims or copied Remedy Place brand assets/copy/photography.
- Interaction must work with pointer, keyboard and touch.
- Essential content must remain readable without JavaScript.
- `prefers-reduced-motion` disables non-essential transforms/transitions.
- No scroll-jacking.
- No new third-party runtime dependency solely for visual polish.
- Existing optimized WebP images and current preloading strategy remain in place.

## Review Focus

- **Touch-only users:** treatment-card details must be reachable with deterministic first-tap reveal and second-level actions without hover.
- **Keyboard users:** navigation overlay, treatment reveals, FAQ and dialogs must be fully operable with visible focus and focus return.
- **JavaScript-disabled / JS-failure state:** treatment names, prices, descriptions, booking links and core navigation must remain available in semantic HTML.
- **Very narrow screens (~390px and below):** no horizontal overflow, clipped hero copy, covered content or unusable sticky booking control.
- **Booking integration edge cases:** Salonized widget mode, external booking URL mode and missing-booking fallback must all retain the current working destinations and must not submit an appointment during QA.

---

### Task 1: Expand the regression contract before redesign work

**Files:**
- Modify: `tests/test_visual_contract.py`
- Test: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: current generated-source contract in `styles.css`, `app.js`, `DESIGN.md`, `index.template.html` and `build.py`.
- Produces: failing tests that define the Remedy-inspired markup and interaction contract used by Tasks 2–7.

- [ ] **Step 1: Add failing tests for the new homepage structure**

Add tests asserting the source contains:

```python
self.assertIn('data-menu-overlay', TEMPLATE)
self.assertIn('aria-expanded="false"', TEMPLATE)
self.assertIn('treatment-experience', BUILD)
self.assertIn('data-treatment-reveal', BUILD)
self.assertIn('booking-close', BUILD)
```

Also load `index.template.html` and `build.py` into the test module as `TEMPLATE` and `BUILD`.

- [ ] **Step 2: Add failing interaction/accessibility tests**

Assert `app.js` contains named initializers or equivalent stable markers for:
- `initMenuOverlay`
- `initTreatmentReveals`
- `Escape`
- `aria-expanded`
- focus return logic marker such as `previouslyFocused`
- `prefers-reduced-motion: reduce` remains in CSS
- no `scrollTo`/wheel interception used for scroll-jacking.

- [ ] **Step 3: Add white-surface and responsive contract assertions**

Assert:
- `--color-bg-primary: #ffffff`
- `--color-surface-secondary: #ffffff`
- `--color-surface-muted: #ffffff`
- header and footer remain `var(--paper)`
- treatment cards do not introduce a persistent non-white section background
- mobile media query includes a single-column treatment layout and no forced viewport width.

- [ ] **Step 4: Run the regression suite and confirm failure**

Run:

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
```

Expected: FAIL only on the newly introduced Remedy-inspired contract assertions.

- [ ] **Step 5: Commit**

```bash
git add tests/test_visual_contract.py
git commit -m "test: define Remedy-inspired Baitan contract"
```

---

### Task 2: Rebuild the navigation shell and premium overlay

**Files:**
- Modify: `index.template.html`
- Modify: `styles.css`
- Modify: `app.js`
- Test: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: current booking placeholders `{{BOOKING_HREF}}`, `{{BOOKING_ATTRS}}`; existing base navigation behavior remains available underneath.
- Produces: semantic header with menu trigger `[data-menu-toggle]`, overlay `[data-menu-overlay]`, close control `[data-menu-close]`, grouped navigation links and stable ARIA attributes used by Task 7 browser QA.

- [ ] **Step 1: Write/adjust tests for menu markup semantics**

Assert the template includes:
- toggle button with `aria-controls="site-menu"` and `aria-expanded="false"`
- overlay container `id="site-menu"` with `data-menu-overlay` and initially hidden semantics
- close button
- booking CTA inside the overlay.

- [ ] **Step 2: Run the focused tests and confirm failure**

Run:

```bash
python -m unittest tests.test_visual_contract.VisualContractTests -v
```

Expected: menu-specific assertions FAIL.

- [ ] **Step 3: Implement the semantic overlay in `index.template.html`**

Keep the existing brand link and booking placeholders. Group links under visible labels equivalent to `Ontdek`, `Plan` and `Baitan`. Do not hard-code treatment data here; treatment-specific links generated from data belong in `build.py` if dynamic treatment links are needed.

- [ ] **Step 4: Implement overlay styling in `styles.css`**

Requirements:
- fully white overlay;
- desktop editorial multi-column layout;
- mobile full-height layout;
- no opacity-only essential content hiding;
- link stagger uses transform/transition only;
- visible focus state;
- header remains fully opaque white and becomes slightly tighter after scroll.

- [ ] **Step 5: Implement `initMenuOverlay()` in `app.js`**

Behavior:
- open/close updates `aria-expanded` and hidden/open state;
- Escape closes;
- focus moves into overlay on open;
- Tab remains inside while open;
- closing restores focus to the triggering element;
- body scroll is locked only while menu is open;
- reduced-motion path skips transforms, not functionality.

- [ ] **Step 6: Run tests and build**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
```

Expected: PASS for menu contract and production build.

- [ ] **Step 7: Commit**

```bash
git add index.template.html styles.css app.js tests/test_visual_contract.py
git commit -m "feat: add premium Baitan navigation overlay"
```

---

### Task 3: Redesign the hero and first-view editorial rhythm

**Files:**
- Modify: `build.py` (`hero(site)`, `intro_section(site)`, `trustbar(site)`)
- Modify: `styles.css`
- Modify: `app.js`
- Test: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: existing hero content from `site["hero"]`, `booking_href(site)`, `booking_attrs(site)`, address/trust/opening data.
- Produces: `.hero` markup with stable sub-elements for copy/image/meta; `.brand-statement` section; first-view motion hooks `[data-hero-reveal]` and optional `[data-parallax]`.

- [ ] **Step 1: Add failing hero structure tests**

Assert `build.py` outputs stable markers/classes for:
- `hero-copy`
- `hero-photo`
- `hero-meta`
- `brand-statement`
- booking CTA and treatment discovery link.

- [ ] **Step 2: Run tests and confirm failure**

Run the unittest suite; expected new hero/statement assertions FAIL.

- [ ] **Step 3: Refactor `hero(site)` minimally**

Keep existing business copy/data sources and image source. Add semantic meta grouping for location/opening context and explicit motion hooks. Do not invent new business claims.

- [ ] **Step 4: Replace `intro_section(site)` with the brand-statement composition**

Use existing truthful copy only. The section should be typographically large, sparse and fully white.

- [ ] **Step 5: Restyle hero and statement**

Desktop target: approximately 82–92% viewport impact without clipping; mobile copy first, image second; max image scale around `1.02`; no video, gradient or dark background.

- [ ] **Step 6: Extend the interaction layer**

Add restrained first-load settle and optional scroll-linked image movement using requestAnimationFrame or CSS variables without wheel interception or layout-thrashing.

- [ ] **Step 7: Run tests/build and commit**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
git add build.py styles.css app.js tests/test_visual_contract.py
git commit -m "feat: rebuild Baitan hero and brand statement"
```

---

### Task 4: Build the signature treatment experience cards

**Files:**
- Modify: `build.py` (`treatments_section(site, treatments)`)
- Modify: `styles.css`
- Modify: `app.js`
- Test: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: `active_treatments(treatments)`, `money(value)`, `booking_href(site)`, `booking_attrs(site)`, existing treatment fields (`id`, `slug`, `name`, `description`, `durations`, `image`, `imageAlt`, `imageLabel`).
- Produces: each `.treatment-experience` with trigger/state attributes including `data-treatment-reveal`, `aria-expanded`, reveal panel, detail link and booking link; `initTreatmentReveals()` manages touch/keyboard state only.

- [ ] **Step 1: Add failing treatment-card contract tests**

Assert generated-source markup contains:
- `treatment-experience`
- `data-treatment-reveal`
- `aria-expanded="false"`
- existing description, duration/price loop and both detail/booking links remain sourced from treatment data.

Add a regression check that the price text is still computed through `money()` and no representative treatment price is duplicated as a CSS/JS literal.

- [ ] **Step 2: Run tests and confirm failure**

Expected: treatment reveal assertions FAIL.

- [ ] **Step 3: Refactor `treatments_section()` markup**

Resting state must expose treatment name and starting price in HTML. Expanded content contains description, real duration/price choices, detail action and booking action. Essential content must remain present in DOM without JS.

- [ ] **Step 4: Implement treatment-card styling**

Pointer hover/focus-visible reveals panel; image scale max `1.025`; card lift max `4px`; white persistent surfaces; Clay only for action emphasis; no overlay that makes text unreadable over imagery.

- [ ] **Step 5: Implement `initTreatmentReveals()`**

Requirements:
- pointer hover works through CSS and does not require JS;
- keyboard focus/Enter/Space toggles `aria-expanded` where appropriate;
- touch first tap reveals card, action links remain independently tappable;
- opening one touch card may close another to prevent long stacked expanded states;
- no hover-only information.

- [ ] **Step 6: Run tests/build and commit**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
git add build.py styles.css app.js tests/test_visual_contract.py
git commit -m "feat: add interactive treatment experience cards"
```

---

### Task 5: Recompose massage choice, about, prices and proof sections

**Files:**
- Modify: `build.py` (existing massage-choice, about, price and local/proof section renderers)
- Modify: `styles.css`
- Modify: `app.js` only if a presentation transition needs progressive enhancement
- Test: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: current choice-helper DOM IDs/classes expected by `assets/app-base.js`; existing business data and price data.
- Produces: same functional choice-helper contract, editorial about composition, refined price rows and truthful proof facts without changing underlying algorithms/data.

- [ ] **Step 1: Add regressions protecting the choice-helper and price data contract**

Assert build output still contains the IDs/classes consumed by the base JS choice flow and that price rows are generated from `durations` rather than duplicated literals.

- [ ] **Step 2: Run tests to establish red/green boundary**

Tests protecting existing behavior should PASS; any new layout marker assertions should FAIL before implementation.

- [ ] **Step 3: Restyle/recompose the massage-choice section**

Preserve current JS semantics. Use large questions, white background, thin progress, one clear selected state and responsive controls.

- [ ] **Step 4: Recompose the about/Baitan experience block**

Use current approved image and only data-supported facts. No invented staff/history/interior claims.

- [ ] **Step 5: Rebuild price presentation**

Use horizontal editorial rows on desktop and stacked rows on mobile, direct booking affordance, clean separators and no horizontal overflow.

- [ ] **Step 6: Reframe local/proof information**

Use current rating/location/parking/opening facts only; keep aggregate review data honest if no quote dataset exists.

- [ ] **Step 7: Run tests/build and commit**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
git add build.py styles.css app.js tests/test_visual_contract.py
git commit -m "feat: refine Baitan decision and pricing sections"
```

---

### Task 6: Rebuild gallery, reviews, gift, FAQ, contact, closing CTA and footer

**Files:**
- Modify: `build.py` (gallery/reviews/gift/FAQ/contact/booking/footer renderers as applicable)
- Modify: `styles.css`
- Modify: `app.js` only for presentation hooks not already provided by base behavior
- Modify: `DESIGN.md`
- Test: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: current gift destination, review aggregate/source, FAQ data, address/hours/phone, map-consent behavior, booking functions and footer/legal links.
- Produces: asymmetrical editorial gallery, spacious review section, image-led gift block, preserved FAQ behavior, editorial contact area, `.booking-close` CTA and minimal white footer.

- [ ] **Step 1: Add failing closing-section structure tests**

Assert source/build includes `.booking-close`, footer white contract, map-consent marker, FAQ control markers and existing gift/review destinations.

- [ ] **Step 2: Run tests and confirm only new layout assertions fail**

- [ ] **Step 3: Recompose gallery**

Vary image spans through CSS grid; preserve all image assets/alt text; no carousel.

- [ ] **Step 4: Recompose reviews and gift**

Do not invent quotes. Keep current aggregate rating/count/source link if that is the available data. Keep gift-card destination unchanged.

- [ ] **Step 5: Refine FAQ and contact**

Preserve existing accordion and map-consent functionality. Increase click/tap targets and spacing; all persistent surfaces white.

- [ ] **Step 6: Replace the old booking close with `.booking-close` presentation**

Keep `booking_href(site)`, `booking_attrs(site)` and all Salonized fallback branches intact. Only presentation/section composition changes.

- [ ] **Step 7: Keep footer fully white and minimal**

Retain legal/contact/opening links and focus visibility.

- [ ] **Step 8: Update `DESIGN.md`**

Document Remedy-inspired Baitan rules, interaction limits, full-white persistent-surface contract, touch/keyboard parity and no-copying boundary.

- [ ] **Step 9: Run tests/build and commit**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
git add build.py styles.css app.js DESIGN.md tests/test_visual_contract.py
git commit -m "feat: complete Baitan editorial homepage journey"
```

---

### Task 7: Harden responsive behavior, accessibility and reduced motion

**Files:**
- Modify: `styles.css`
- Modify: `app.js`
- Modify: `tests/test_visual_contract.py`

**Interfaces:**
- Consumes: all stable classes/data attributes produced in Tasks 2–6.
- Produces: final responsive/a11y interaction contract ready for browser QA.

- [ ] **Step 1: Add regression assertions for edge conditions from Review Focus**

Tests must assert:
- menu has Escape/focus-return logic markers;
- treatment reveal has touch and keyboard paths;
- reduced motion disables transforms/transitions;
- no JS hides essential treatment content by default;
- CSS contains 390px-safe/single-column rules and no `100vw` element that can create horizontal overflow in content sections.

- [ ] **Step 2: Run tests and confirm failures where hardening is incomplete**

- [ ] **Step 3: Harden focus and ARIA state changes**

Ensure menu and treatment controls keep `aria-expanded` synchronized and focus is returned after close.

- [ ] **Step 4: Harden mobile/touch behavior**

Verify full-height menu, copy-first hero, single-column treatment flow, minimum ~44px targets, sticky booking not covering page content and deterministic touch reveals.

- [ ] **Step 5: Harden reduced-motion behavior**

All non-essential movement becomes static while functionality remains unchanged.

- [ ] **Step 6: Run full automated suite and production build**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
```

Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add styles.css app.js tests/test_visual_contract.py
git commit -m "fix: harden responsive and accessible interactions"
```

---

### Task 8: Release verification, PR, exact-SHA merge and Render production smoke test

**Files:**
- Verify: `.github/workflows/ci.yml`
- Verify: `.github/workflows/build-check.yml`
- Verify generated: `dist/`
- No product-code changes unless QA finds a blocking defect.

**Interfaces:**
- Consumes: completed feature branch from Tasks 1–7.
- Produces: reviewed PR, green CI/build, exact tested merge SHA, Render live deployment and smoke-test evidence.

- [ ] **Step 1: Run local release checks**

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
npm run build
```

Also verify required `dist/` files, canonical routes, sitemap/robots, shared assets and legal noindex behavior match the existing workflow expectations.

- [ ] **Step 2: Run browser QA against the generated artifact or preview**

Required viewports/flows:
- ~1440px desktop;
- 768–1024px tablet;
- ~390px mobile;
- keyboard-only navigation;
- menu overlay open/close/Escape/focus return;
- treatment reveal by pointer/focus/touch path;
- massage-choice helper;
- FAQ;
- treatment/legal dialogs;
- Salonized booking link/widget open only, no appointment submission;
- map consent;
- no horizontal overflow;
- no persistent non-white page surfaces.

- [ ] **Step 3: Open PR against `main`**

PR body must summarize:
- Remedy-inspired interaction/presentation changes;
- preserved business/integration boundaries;
- automated results;
- browser QA results;
- exact tested head SHA.

- [ ] **Step 4: Wait for both GitHub checks**

Required:
- `CI` success;
- `Build check` success.

If either fails, fix on the same feature branch, rerun the full relevant checks and update browser QA if presentation changed.

- [ ] **Step 5: Confirm PR head did not move after final verification**

Merge only when the PR head SHA equals the exact SHA that passed automated and browser verification.

- [ ] **Step 6: Merge the exact tested SHA**

Use normal merge method accepted by the repository. Do not manually trigger Render because production service auto-deploys `main` commits.

- [ ] **Step 7: Verify Render deployment**

Confirm the production `baitanmassage` Render service deploy is:
- trigger: new commit;
- commit: exact merge SHA;
- status: live.

- [ ] **Step 8: Production smoke test**

Verify homepage, one treatment page, prices/contact/legal route, mobile header/menu, one treatment reveal, FAQ and booking destination on `https://baitanmassage.onrender.com` without creating a real booking.

- [ ] **Step 9: Final completion report**

Report:
- merged PR number;
- tested head SHA;
- merge SHA;
- Render deployment ID/status;
- automated check status;
- browser QA coverage;
- any external booking limitation observed.
