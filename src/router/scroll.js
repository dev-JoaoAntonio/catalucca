import { getLenis } from '@/composables/useLenis';

export function scrollBehavior(to, from, savedPosition) {
  if (typeof window === 'undefined') return;

  const lenis = getLenis();
  if (to.hash) {
    const target = document.querySelector(to.hash);
    if (target && lenis) {
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      lenis.scrollTo(target, { offset: -headerHeight, duration: 1.5 });
      return false;
    }
    return { el: to.hash, behavior: 'smooth' };
  }
  if (savedPosition) return savedPosition;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  return { top: 0 };
}
