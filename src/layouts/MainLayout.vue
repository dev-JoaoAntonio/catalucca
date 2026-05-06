<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import WhatsappFloat from '@/components/WhatsappFloat.vue';

const route = useRoute();

const bodyClass = computed(() => (route.name === 'governo' ? 'government' : ''));

const footerConfig = computed(() => {
  switch (route.name) {
    case 'educacao':
      return {
        slogan: 'Ciência portátil para o futuro da educação.',
        secondaryContact: {
          label: 'Área do Professor',
          href: '#',
          external: false,
          icon: 'user',
        },
      };
    case 'operacional-privado':
      return {
        slogan: 'Inteligência operacional com cadeia de custódia digital.',
        secondaryContact: {
          label: 'Consultoria Empresarial',
          href: 'https://wa.me/5547999455080',
          external: true,
          icon: 'whatsapp',
        },
      };
    case 'governo':
      return {
        slogan: 'Infraestrutura científica a serviço da Administração Pública.',
        secondaryContact: {
          label: 'Consultoria Técnica',
          href: 'https://wa.me/5547999455080',
          external: true,
          icon: 'whatsapp',
        },
      };
    case 'contato':
      return {
        slogan: 'Fale com a equipe Catalucca.',
        secondaryContact: {
          label: 'Consultoria Técnica (WhatsApp)',
          href: 'https://wa.me/5547999455080',
          external: true,
          icon: 'whatsapp',
        },
      };
    default:
      return {
        slogan: 'Infraestrutura Científica de Borda.',
        secondaryContact: {
          label: 'Consultoria Técnica (WhatsApp)',
          href: 'https://wa.me/5547999455080',
          external: true,
          icon: 'whatsapp',
        },
      };
  }
});

const whatsappConfig = computed(() => {
  switch (route.name) {
    case 'operacional-privado':
      return { tooltip: 'Falar com Especialista' };
    case 'governo':
      return {
        tooltip: 'Falar com Consultor Técnico',
        message: 'Olá, gostaria de solicitar uma demonstração técnica do Sistema Ø—1™ para minha instituição.',
      };
    case 'home':
      return {
        tooltip: 'Falar com Consultor',
        message: 'Olá, gostaria de solicitar uma demonstração técnica do Sistema Ø—1™ para minha instituição.',
      };
    default:
      return {};
  }
});
</script>

<template>
  <div class="app-shell" :class="bodyClass">
    <AppNavbar />

    <main>
      <slot />
    </main>

    <AppFooter
      :slogan="footerConfig.slogan"
      :secondary-contact="footerConfig.secondaryContact"
    />

    <WhatsappFloat v-bind="whatsappConfig" />
  </div>
</template>
