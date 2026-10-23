import { scrollToTarget } from '@/composables/useLenis';

export function scrollBehavior(to, from, savedPosition) {
  if (typeof window === 'undefined') return;

  // Hash explícito ou a seção da rota (ex.: /governo → #governo).
  const target = to.hash || (to.meta.section && `#${to.meta.section}`);

  if (target) {
    const firstLoad = from.matched.length === 0;
    const samePage = from.path === to.path;
    // Vindo de outra rota, espera o DOM da landing antes de procurar a âncora.
    return new Promise((resolve) => {
      setTimeout(() => {
        scrollToTarget(target, { immediate: firstLoad });
        resolve(false);
      }, samePage && !firstLoad ? 0 : 120);
    });
  }
  if (savedPosition) return savedPosition;
  return { top: 0 };
}
