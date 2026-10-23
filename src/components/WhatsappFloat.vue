<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { whatsappLink } from '@/data/contact';

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
    <svg class="wa-float__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41"/>
    </svg>
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
  border-radius: var(--radius-lg);
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

.wa-float__icon {
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
