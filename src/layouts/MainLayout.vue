<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import WhatsappFloat from '@/components/WhatsappFloat.vue';
</script>

<template>
  <div class="app-shell">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <ScrollProgress />
    <AppNavbar />

    <main id="conteudo" tabindex="-1">
      <slot />
    </main>

    <AppFooter />
    <WhatsappFloat />
  </div>
</template>
