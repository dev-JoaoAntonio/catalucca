import { createRouter, createWebHistory } from 'vue-router';
import { getLenis } from '@/composables/useLenis';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/IndexPage.vue'),
    meta: { title: 'CATALUCCA | Infraestrutura Científica de Borda' },
  },
  {
    path: '/educacao',
    name: 'educacao',
    component: () => import('@/pages/EducacaoPage.vue'),
    meta: { title: 'Educação | Protagonismo Digital Investigativo' },
  },
  {
    path: '/operacional-privado',
    name: 'operacional-privado',
    component: () => import('@/pages/OperacionalPrivadoPage.vue'),
    meta: { title: 'Operacional Privado | Inteligência Operacional' },
  },
  {
    path: '/governo',
    name: 'governo',
    component: () => import('@/pages/GovernoPage.vue'),
    meta: { title: 'Governo | Inteligência Territorial' },
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('@/pages/ContatoPage.vue'),
    meta: { title: 'Contato | CATALUCCA' },
  },
  // Redirects de rotas antigas (Vercel também faz 301 server-side)
  { path: '/setor-privado', redirect: '/operacional-privado' },
  { path: '/setor-publico', redirect: '/governo' },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
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
  },
});

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title;
  }
});

export default router;
