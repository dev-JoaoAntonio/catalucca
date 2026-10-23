<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { FAQ } from '@/data/faq';
import { pageSeo } from '@/data/seo';
import HeroSection from '@/components/sections/HeroSection.vue';
import PressMarquee from '@/components/sections/PressMarquee.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import TechnologySection from '@/components/sections/TechnologySection.vue';
import MethodSection from '@/components/sections/MethodSection.vue';
import ProtocolSection from '@/components/sections/ProtocolSection.vue';
import SolutionsSection from '@/components/sections/SolutionsSection.vue';
import ImpactSection from '@/components/sections/ImpactSection.vue';
import EcosystemSection from '@/components/sections/EcosystemSection.vue';
import PricingSection from '@/components/sections/PricingSection.vue';
import FaqSection from '@/components/sections/FaqSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import CtaBand from '@/components/ui/CtaBand.vue';

// A mesma landing atende a todas as URLs indexadas; cada uma mantém o seu
// título, descrição e canonical.
const route = useRoute();
const seo = computed(() => pageSeo(route.name));

const FAQ_LD = {
  type: 'application/ld+json',
  innerHTML: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }),
};

useHead({
  title: computed(() => seo.value.title),
  meta: computed(() => [
    { name: 'description', content: seo.value.description },
    { property: 'og:title', content: seo.value.shareTitle },
    { property: 'og:description', content: seo.value.description },
    { property: 'og:url', content: seo.value.url },
    { property: 'og:image', content: seo.value.image },
    { name: 'twitter:title', content: seo.value.shareTitle },
    { name: 'twitter:description', content: seo.value.description },
    { name: 'twitter:image', content: seo.value.image },
  ]),
  link: computed(() => [{ rel: 'canonical', href: seo.value.url }]),
  script: computed(() => (route.name === 'home' ? [FAQ_LD] : [])),
});
</script>

<template>
  <HeroSection />
  <PressMarquee />
  <AboutSection />
  <TechnologySection />
  <MethodSection />
  <ProtocolSection />
  <CtaBand message="Olá! Gostaria de agendar uma demonstração técnica da cadeia de custódia da Catalucca.">
    <template #title>Veja a cadeia de custódia <em>funcionando</em>.</template>
    Agende uma demonstração técnica e acompanhe, etapa por etapa, da captura travada à evidência
    sincronizada no Hub ATLAS.
  </CtaBand>
  <SolutionsSection />
  <ImpactSection />
  <CtaBand>
    <template #title>Leve a precisão do laboratório <em>para o território</em>.</template>
    Converse com a equipe técnica e veja como a triagem na borda se aplica à sua operação.
    Resposta em até um dia útil.
  </CtaBand>
  <EcosystemSection />
  <PricingSection />
  <FaqSection />
  <ContactSection />
</template>
