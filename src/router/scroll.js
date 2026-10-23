import { scrollToTarget } from '@/composables/useLenis';

export function scrollBehavior(to, from, savedPosition) {
  if (typeof window === 'undefined') return;

  // Hash explícito ou a seção da rota (ex.: /governo → #governo).
  const target = to.hash || (to.meta.section && `#${to.meta.section}`);

  if (target) {
    const firstLoad = from.matched.length === 0;
    const samePage = from.path === to.path;
    return new Promise((resolve) => {
      const run = () => {
        scrollToTarget(target, { immediate: firstLoad });
        resolve(false);
      };
      if (firstLoad) {
        // Na primeira carga, espera as fontes: a troca para a serifa muda as
        // alturas das seções e deslocaria o destino.
        Promise.resolve(document.fonts?.ready).then(() => setTimeout(run, 60));
      } else {
        // Vindo de outra rota, espera o DOM da landing antes de procurar a âncora.
        setTimeout(run, samePage ? 0 : 120);
      }
    });
  }
  if (savedPosition) return savedPosition;
  return { top: 0 };
}
