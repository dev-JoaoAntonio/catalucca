<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useHead } from '@unhead/vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { initLenis, destroyLenis } from '@/composables/useLenis';

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:site_name', content: 'CATALUCCA' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@catalucca' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CATALUCCA Tecnologias',
        legalName: 'CATALUCCA Tecnologias LTDA',
        url: 'https://www.catalucca.com.br',
        logo: 'https://www.catalucca.com.br/favicon/logo.png',
        image: 'https://www.catalucca.com.br/images/logo-tab.jpg',
        description:
          'Infraestrutura Científica de Borda. Microscopia digital com tecnologia italiana SMO/IIT (DIPLE™ e BLIPS™), resolução submicrométrica de 0,7 µm.',
        taxID: '61.810.236/0001-88',
        email: 'suporte@catalucca.com.br',
        telephone: '+55-47-99945-5080',
        address: [
          {
            '@type': 'PostalAddress',
            addressLocality: 'Brasília',
            addressRegion: 'DF',
            addressCountry: 'BR',
            streetAddress: 'Setor de Autarquias Sul',
          },
          {
            '@type': 'PostalAddress',
            addressLocality: 'Itajaí',
            addressRegion: 'SC',
            addressCountry: 'BR',
            streetAddress: 'Rodovia Jorge Lacerda',
          },
        ],
        sameAs: [],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CATALUCCA',
        url: 'https://www.catalucca.com.br',
        inLanguage: 'pt-BR',
        publisher: { '@type': 'Organization', name: 'CATALUCCA Tecnologias' },
      }),
    },
  ],
});

onMounted(() => {
  // Safety: o navegador pode tentar restaurar uma posição de scroll antiga
  // antes do scrollRestoration = 'manual' (em main.js) ter efeito. Quando a
  // landing tem seções altas (300vh do Diple3DSection), essa posição salva
  // pode cair no meio da seção 3D dando aparência de "auto-scroll". Forçamos
  // topo apenas em navegação fresca sem hash, sem prejudicar links âncora.
  if (typeof window !== 'undefined' && !window.location.hash && window.scrollY > 0) {
    window.scrollTo(0, 0);
  }
  initLenis();
});

onBeforeUnmount(() => {
  destroyLenis();
});
</script>

<template>
  <MainLayout>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </MainLayout>
</template>
