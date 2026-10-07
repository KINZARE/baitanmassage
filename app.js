/* Load the proven Baitan behavior first, then add the Remedy-inspired progressive enhancement layer. */
const baitanBaseScript = document.createElement('script');
baitanBaseScript.src = '/assets/app-base.js';
baitanBaseScript.async = false;

const focusableMenuItems = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initMenuOverlay() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const overlay = document.querySelector('[data-menu-overlay]');
  const closeButton = document.querySelector('[data-menu-close]');
  if (!toggle || !overlay || !closeButton) return;

  let previouslyFocused = null;

  const setExpanded = value => toggle.setAttribute('aria-expanded', String(value));

  const openMenu = () => {
    previouslyFocused = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('menu-overlay-open');
    setExpanded(true);
    closeButton.focus({ preventScroll: true });
    requestAnimationFrame(() => overlay.classList.add('is-open'));
  };

  const closeMenu = () => {
    overlay.classList.remove('is-open');
    setExpanded(false);
    document.body.classList.remove('menu-overlay-open');
    overlay.hidden = true;
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => {
    if (overlay.hidden) openMenu();
    else closeMenu();
  });
  closeButton.addEventListener('click', closeMenu);

  overlay.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', closeMenu));

  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [...overlay.querySelectorAll(focusableMenuItems)].filter(item => !item.hasAttribute('hidden'));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initTreatmentReveals() {
  const cards = [...document.querySelectorAll('.treatment-visual')];
  if (!cards.length) return;
  const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)');
  const touchCapable = () => coarsePointer.matches || navigator.maxTouchPoints > 0;
  const supportsPointerEvents = 'PointerEvent' in window;

  const setExpanded = (card, expanded) => {
    card.classList.toggle('is-expanded', expanded);
    card.setAttribute('aria-expanded', String(expanded));
    if (!expanded) delete card.dataset.touchRevealed;
  };

  const collapseOthers = active => {
    cards.forEach(card => {
      if (card === active) return;
      setExpanded(card, false);
    });
  };

  cards.forEach(card => {
    card.setAttribute('data-treatment-reveal', '');
    card.setAttribute('aria-expanded', 'false');
    let touchPending = false;

    const mediaLink = card.querySelector('.treatment-media[href]');
    if (mediaLink) {
      mediaLink.addEventListener('pointerdown', event => {
        touchPending = event.pointerType === 'touch';
      }, { capture: true });

      mediaLink.addEventListener('click', event => {
        const touchActivation = touchPending || (!supportsPointerEvents && touchCapable());
        touchPending = false;
        if (!touchActivation || card.dataset.touchRevealed === 'true') return;
        event.preventDefault();
        event.stopImmediatePropagation();
        collapseOthers(card);
        setExpanded(card, true);
        card.dataset.touchRevealed = 'true';
      }, { capture: true });
    }

    card.addEventListener('click', event => {
      if (!touchCapable() || event.target.closest('a, button')) return;
      collapseOthers(card);
      setExpanded(card, !card.classList.contains('is-expanded'));
      if (card.classList.contains('is-expanded')) card.dataset.touchRevealed = 'true';
    });

    card.addEventListener('focusin', () => {
      if (touchPending) return;
      setExpanded(card, true);
    });
    card.addEventListener('focusout', event => {
      if (!card.contains(event.relatedTarget)) setExpanded(card, false);
    });
  });

  document.documentElement.classList.add('treatment-reveal-ready');
}

function initInViewMotion(reduceMotion) {
  const revealSelectors = [
    '.section-head',
    '.intro-grid',
    '.treatment-visual',
    '.about-grid',
    '.choice-section-inner',
    '.price-treatment',
    '.local-seo-grid',
    '.gallery-item',
    '.gift-shell',
    '.review-band',
    '.faq-item',
    '.contact-grid',
    '.booking-concise-inner',
    '.detail-hero-grid',
    '.detail-layout',
    '.seo-card-visual'
  ];

  const revealNodes = [...document.querySelectorAll(revealSelectors.join(','))];
  revealNodes.forEach((node, index) => {
    node.setAttribute('data-reveal', '');
    node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach(node => node.classList.add('is-inview'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-inview');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -7% 0px'
  });

  revealNodes.forEach(node => observer.observe(node));
}

function initHeaderState() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;
  let queued = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function initHeroMotion(reduceMotion) {
  const hero = document.querySelector('.hero');
  const image = document.querySelector('.hero-photo img');
  if (!hero || !image || reduceMotion) return;
  let queued = false;
  const update = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, -rect.top / Math.max(rect.height, 1)));
    image.style.setProperty('--hero-shift', `${Math.round(progress * 10)}px`);
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function initEditorialAliases() {
  const intro = document.querySelector('.intro-section');
  if (intro) intro.classList.add('brand-statement');
  const bookingClose = document.querySelector('.booking-concise');
  if (bookingClose) bookingClose.classList.add('booking-close');
  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy) heroCopy.setAttribute('data-hero-reveal', '');
}

function initBaitanInteractionLayer() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  initEditorialAliases();
  initMenuOverlay();
  initTreatmentReveals();
  initHeaderState();
  initInViewMotion(reduceMotion);
  initHeroMotion(reduceMotion);
  document.documentElement.classList.add('js-motion');
}

baitanBaseScript.addEventListener('load', initBaitanInteractionLayer, { once: true });
baitanBaseScript.addEventListener('error', initBaitanInteractionLayer, { once: true });
document.head.appendChild(baitanBaseScript);
