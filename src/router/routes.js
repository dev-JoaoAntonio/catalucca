export const routes = [
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
    meta: { title: 'Educação | Protagonismo Digital Investigativo — CATALUCCA' },
  },
  {
    path: '/operacional-privado',
    name: 'operacional-privado',
    component: () => import('@/pages/OperacionalPrivadoPage.vue'),
    meta: { title: 'Operacional Privado | Inteligência Operacional — CATALUCCA' },
  },
  {
    path: '/governo',
    name: 'governo',
    component: () => import('@/pages/GovernoPage.vue'),
    meta: { title: 'Governo | Inteligência Territorial — CATALUCCA' },
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('@/pages/ContatoPage.vue'),
    meta: { title: 'Contato | CATALUCCA' },
  },
  // Redirects de URLs antigas
  { path: '/setor-privado', redirect: '/operacional-privado' },
  { path: '/setor-publico', redirect: '/governo' },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];
