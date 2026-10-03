(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const pager = document.querySelector('.pager');
  const current = pager.querySelector('[data-current]');
  const total = pager.querySelector('[data-total]');
  const prev = pager.querySelector('[data-action="prev"]');
  const next = pager.querySelector('[data-action="next"]');
  const fullscreen = pager.querySelector('[data-action="fullscreen"]');
  const progress = document.querySelector('.progress');
  const pad = (n) => String(n).padStart(2, '0');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  total.textContent = pad(slides.length);

  function render() {
    current.textContent = pad(index + 1);
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  }

  function go(i) {
    const target = slides[Math.max(0, Math.min(slides.length - 1, i))];
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  // La lámina activa es la que ocupa más pantalla.
  const ratios = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
    let best = index;
    let bestRatio = -1;
    slides.forEach((s, i) => {
      const r = ratios.get(s) ?? 0;
      if (r > bestRatio) { bestRatio = r; best = i; }
    });
    if (best !== index) {
      index = best;
      render();
      history.replaceState(null, '', `#${slides[index].id}`);
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  slides.forEach((s) => observer.observe(s));

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    // Dentro de un navegador desplazable, las flechas desplazan la maqueta.
    if (e.target.closest && e.target.closest('.browser__view')) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); go(index + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); go(index - 1); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(slides.length - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
    }
  });

  const root = document.documentElement;
  const canFullscreen = !!(root.requestFullscreen || root.webkitRequestFullscreen);
  if (!canFullscreen) fullscreen.remove();

  function toggleFullscreen() {
    if (!canFullscreen) return;
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    if (active) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
    }
  }
  if (canFullscreen) fullscreen.addEventListener('click', toggleFullscreen);

  // Abrir directamente en la lámina del enlace (#colores, #web, …).
  const start = slides.findIndex((s) => `#${s.id}` === location.hash);
  if (start > 0) {
    index = start;
    slides[start].scrollIntoView({ block: 'start' });
  }
  render();
})();
