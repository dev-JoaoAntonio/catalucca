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
    path: '/quem-somos',
    name: 'quem-somos',
    component: () => import('@/pages/QuemSomosPage.vue'),
    meta: { title: 'Quem Somos | CATALUCCA Tecnologias' },
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('@/pages/ContatoPage.vue'),
    meta: { title: 'Contato | CATALUCCA' },
  },
  {
    path: '/sucesso',
    name: 'sucesso',
    component: () => import('@/pages/SucessoPage.vue'),
    meta: { title: 'Pagamento confirmado | CATALUCCA' },
  },
  { path: '/setor-privado', redirect: '/operacional-privado' },
  { path: '/setor-publico', redirect: '/governo' },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];
