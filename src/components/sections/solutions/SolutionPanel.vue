<script setup>
import { useSectionLink } from '@/composables/useSectionLink';

defineProps({
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  ctaHref: { type: String, required: true },
});

const go = useSectionLink();
</script>

<template>
  <div class="panel">
    <div class="panel__intro">
      <div class="panel__copy">
        <h3 class="panel__title" v-split="'manual'">{{ title }}</h3>
        <p class="panel__tagline anim" style="--k: 1">{{ tagline }}</p>
        <slot name="lead" />
        <div class="cta-row panel__ctas anim" style="--k: 4">
          <a :href="ctaHref" target="_blank" rel="noopener" class="btn btn--primary btn--arrow">
            Falar com especialista
          </a>
          <a href="/#haas" class="link-cta" @click.prevent="go('#haas')">Ver planos</a>
        </div>
      </div>
      <div class="panel__side anim" style="--k: 2">
        <slot name="side" />
      </div>
    </div>

    <div v-if="$slots.default" class="panel__rows">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel__intro {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: start;
  gap: clamp(2rem, 5vw, 4.5rem);
}

.panel__copy {
  display: grid;
  gap: 1.5rem;
}

.panel__title {
  font-size: clamp(2.25rem, 3.6vw, 3.25rem);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

.panel__tagline {
  margin-top: -0.75rem;
  font-size: 1.0625rem;
  color: var(--text);
}

.panel__ctas {
  margin-top: 0.5rem;
}

.panel__rows {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
}

@media (max-width: 900px) {
  .panel__intro {
    grid-template-columns: 1fr;
  }
}
</style>
