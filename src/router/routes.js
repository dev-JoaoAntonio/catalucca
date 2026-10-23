import { PAGE_SEO } from '@/data/seo';

// O site é uma landing de página única, mas as URLs das antigas páginas
// internas continuam respondendo (e indexadas): todas renderizam a landing,
// com o próprio título/canonical, e rolam até a seção correspondente.
const LANDING_SECTIONS = {
  home: null,
  educacao: 'educacao',
  'operacional-privado': 'operacional',
  governo: 'governo',
  'quem-somos': 'sobre',
  contato: 'contato',
};

const IndexPage = () => import('@/pages/IndexPage.vue');

export const routes = [
  ...Object.entries(LANDING_SECTIONS).map(([name, section]) => ({
    path: PAGE_SEO[name].path,
    name,
    component: IndexPage,
    meta: { title: PAGE_SEO[name].title, landing: true, section },
  })),
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
