(() => {
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll([
    '.overview-hero .copy',
    '.story .copy',
    '.story .app-gallery',
    '.story .arc-research',
    '.section-glucose .section-inner > :not(.app-gallery)',
    '.journey-future > *',
    '.final-inner > :not(footer)',
  ].join(', '));

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('is-waiting');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -7% 0px' });

  const viewportBottom = document.documentElement.clientHeight;
  for (const target of targets) {
    if (target.getBoundingClientRect().top < viewportBottom) continue;
    target.classList.add('scroll-reveal', 'is-waiting');
    if (target.classList.contains('app-gallery')) {
      target.classList.add('scroll-reveal--screens');
    }
    observer.observe(target);
  }
})();
