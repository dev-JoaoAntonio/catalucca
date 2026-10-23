import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;
const scrollListeners = new Set();

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
  lenisInstance.on('scroll', (lenis) => scrollListeners.forEach((cb) => cb(lenis)));

  const raf = (time) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

// Assina os eventos de rolagem do Lenis (velocidade, direção). Pode ser
// chamado antes do initLenis; devolve a função para cancelar a assinatura.
export function onLenisScroll(callback) {
  scrollListeners.add(callback);
  return () => scrollListeners.delete(callback);
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

  // Destino calculado pela posição real da janela: se a altura da página
  // acabou de mudar (ex.: troca de aba), a posição interna do Lenis pode
  // estar desatualizada.
  const top = el.getBoundingClientRect().top + window.scrollY;
  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(top, { duration: 1.4, immediate });
  } else {
    const smooth = !immediate && !prefersReducedMotion();
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  }
  return true;
}
