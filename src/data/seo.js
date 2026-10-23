// Metadados de cada URL da landing. As rotas antigas continuam existindo (e
// indexadas) com o mesmo título, descrição e canonical; todas renderizam a
// landing e rolam até a seção correspondente.
const SITE = 'https://www.catalucca.com.br';

export const PAGE_SEO = {
  home: {
    path: '/',
    title: 'CATALUCCA | Infraestrutura Científica de Borda',
    shareTitle: 'CATALUCCA | Infraestrutura Científica de Borda',
    description:
      'Infraestrutura Científica de Borda e Microscopia Digital (SMO/IIT) para Governo, Agro e Indústria. Tecnologia italiana com resolução de 0,7 µm.',
  },
  educacao: {
    path: '/educacao',
    title: 'Educação | Protagonismo Digital Investigativo — CATALUCCA',
    shareTitle: 'Educação | CATALUCCA',
    description:
      'Sistema Ø—1™ para escolas e universidades. Conformidade com Lei 15.100/2025 e BNCC. Smartphone como Estação Científica de Alta Performance.',
  },
  'operacional-privado': {
    path: '/operacional-privado',
    title: 'Operacional Privado | Inteligência Operacional — CATALUCCA',
    shareTitle: 'Operacional Privado | CATALUCCA',
    description:
      'Inspeção móvel, perícia técnica e cadeia de custódia matemática para empresas. Resolução de 0,7 µm com stacking não destrutivo.',
  },
  governo: {
    path: '/governo',
    title: 'Governo | Inteligência Territorial — CATALUCCA',
    shareTitle: 'Governo | CATALUCCA',
    description:
      '10 programas federais em 1 sistema. Triagem técnica de borda com até 85% de redução de custos logísticos. Operação offline-first com Hub ATLAS.',
  },
  'quem-somos': {
    path: '/quem-somos',
    title: 'Quem Somos | CATALUCCA Tecnologias',
    shareTitle: 'Quem Somos | CATALUCCA',
    description:
      'Catalucca é a arquiteta da Exevidência Digital: BYOD + NOC central, Connected Edge Science, Morfofixação com Duplo Hash SHA-256 e Timestamp oficial.',
  },
  contato: {
    path: '/contato',
    title: 'Contato | CATALUCCA',
    shareTitle: 'Contato | CATALUCCA',
    description:
      'Demonstrações técnicas, propostas HaaS e suporte para projetos de educação, operação privada e governo. Resposta em até 1 dia útil.',
  },
};

export function pageSeo(routeName) {
  const page = PAGE_SEO[routeName] || PAGE_SEO.home;
  return { ...page, url: `${SITE}${page.path}`, image: `${SITE}/images/logo-tab.jpg` };
}
