<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { whatsappLink } from '@/data/contact';
import AppIcon from '@/components/ui/AppIcon.vue';

const props = defineProps({
  tooltip: { type: String, default: 'Falar com um consultor' },
  message: {
    type: String,
    default: 'Olá! Gostaria de solicitar uma demonstração técnica do Sistema Ø—1™ para minha instituição.',
  },
});

const route = useRoute();
const pastHero = ref(false);
const href = computed(() => whatsappLink(props.message));
// Na landing, só aparece depois do hero, que já tem seus próprios CTAs.
const visible = computed(() => !route.meta.landing || pastHero.value);

function onScroll() {
  pastHero.value = window.scrollY > window.innerHeight * 0.6;
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <a
    :href="href"
    class="wa-float"
    :class="{ 'is-visible': visible }"
    target="_blank"
    rel="noopener"
    aria-label="Fale conosco pelo WhatsApp"
  >
    <span class="wa-float__tooltip">{{ tooltip }}</span>
    <AppIcon name="whatsapp" />
  </a>
</template>

<style scoped>
.wa-float {
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: 90;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25D366;
  color: #fff;
  box-shadow: 0 14px 30px -12px rgb(37 211 102 / 0.7);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, 16px, 0) scale(0.9);
  transition:
    opacity 0.4s var(--ease),
    transform 0.5s var(--ease);
}

.wa-float.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.wa-float .icon {
  width: 26px;
  height: 26px;
}

.wa-float__tooltip {
  position: absolute;
  right: calc(100% + 0.75rem);
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  background: var(--ink);
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translate3d(6px, 0, 0);
  transition:
    opacity 0.3s var(--ease),
    transform 0.3s var(--ease);
  pointer-events: none;
}

.wa-float:hover .wa-float__tooltip,
.wa-float:focus-visible .wa-float__tooltip {
  opacity: 1;
  transform: none;
}

@media (hover: none) {
  .wa-float__tooltip {
    display: none;
  }
}
</style>
