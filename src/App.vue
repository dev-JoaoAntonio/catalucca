<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { initLenis, destroyLenis } from '@/composables/useLenis';

const route = useRoute();

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
          'Infraestrutura científica de borda. Microscopia digital com tecnologia italiana SMO/IIT (DIPLE™ e BLIPS™) e resolução submicrométrica de 0,7 µm.',
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
  // antes do scrollRestoration = 'manual' (em main.js) ter efeito. As seções
  // fixadas (Tecnologia, Protocolo) são altas, e essa posição salva pode cair
  // no meio delas. Forçamos o topo só em navegação sem hash e fora das URLs
  // de seção (ex.: /governo), que rolam sozinhas até o destino.
  if (!window.location.hash && !route.meta.section && window.scrollY > 0) {
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
