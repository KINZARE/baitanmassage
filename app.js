/* Load the proven Baitan behavior first, then add the lightweight interaction layer. */
const baitanBaseScript = document.createElement('script');
baitanBaseScript.src = '/assets/app-base.js';
baitanBaseScript.async = false;

function initBaitanInteractionLayer() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    '.detail-hero-grid',
    '.detail-layout',
    '.seo-card-visual'
  ];

  const revealNodes = [...document.querySelectorAll(revealSelectors.join(','))];
  revealNodes.forEach((node, index) => {
    node.dataset.reveal = '';
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
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  revealNodes.forEach(node => observer.observe(node));
}

baitanBaseScript.addEventListener('load', initBaitanInteractionLayer, { once: true });
baitanBaseScript.addEventListener('error', initBaitanInteractionLayer, { once: true });
document.head.appendChild(baitanBaseScript);
