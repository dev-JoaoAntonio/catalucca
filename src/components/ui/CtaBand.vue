<script setup>
import { useSectionLink } from '@/composables/useSectionLink';
import { whatsappLink } from '@/data/contact';

defineProps({
  label: { type: String, default: 'Próximo passo' },
  message: {
    type: String,
    default: 'Olá! Gostaria de solicitar uma demonstração técnica da Catalucca.',
  },
});

const go = useSectionLink();
</script>

<template>
  <section class="cta-band">
    <div class="container">
      <div class="cta-band__inner" v-progress="'read'">
        <p class="eyebrow cta-band__label" v-reveal>{{ label }}</p>
        <h2 class="cta-band__title" v-reveal="{ delay: 80 }">
          <slot name="title" />
        </h2>
        <div class="cta-band__side" v-reveal="{ delay: 160 }">
          <p v-if="$slots.default" class="cta-band__text"><slot /></p>
          <div class="cta-row">
            <a :href="whatsappLink(message)" target="_blank" rel="noopener" class="btn btn--primary btn--arrow">
              Solicitar demonstração
            </a>
            <a href="/#contato" class="link-cta" @click.prevent="go('#contato')">Pedir uma proposta</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  padding-block: clamp(3rem, 6vw, 5rem);
}

.cta-band__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: end;
  gap: 1.5rem clamp(2rem, 6vw, 6rem);
  padding-block: clamp(2.5rem, 5vw, 4rem);
  border-block: 1px solid var(--line);
}

/* A régua superior se desenha conforme a faixa entra na tela. */
.cta-band__inner::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transform: scaleX(var(--p, 1));
  transform-origin: left;
}

.cta-band__label {
  grid-column: 1 / -1;
}

.cta-band__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.022em;
}

.cta-band__title :deep(em) {
  font-style: italic;
  font-weight: 300;
}

.cta-band__text {
  margin-bottom: 1.75rem;
  color: var(--text);
}

@media (max-width: 900px) {
  .cta-band__inner {
    grid-template-columns: 1fr;
  }
}
</style>
