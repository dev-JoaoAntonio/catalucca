import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initLenis() {
  if (lenisInstance) return lenisInstance;
  // Quem pediu menos movimento fica com a rolagem nativa.
  if (prefersReducedMotion()) return null;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
    smoothWheel: true,
  });

  const raf = (time) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function destroyLenis() {
  if (rafId) cancelAnimationFrame(rafId);
  lenisInstance?.destroy();
  lenisInstance = null;
  rafId = null;
}

// Rola até um seletor ou elemento, com Lenis quando disponível.
export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return false;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { duration: 1.4, immediate });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const smooth = !immediate && !prefersReducedMotion();
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  }
  return true;
}
