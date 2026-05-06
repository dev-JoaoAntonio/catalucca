<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { initLenis, destroyLenis } from '@/composables/useLenis';

onMounted(() => {
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
