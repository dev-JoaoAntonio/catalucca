import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.6,
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
