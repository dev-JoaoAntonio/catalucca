<script setup>
import { useSectionLink } from '@/composables/useSectionLink';

defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  ctaHref: { type: String, required: true },
});

const go = useSectionLink();
</script>

<template>
  <article :id="id" class="vertical" :aria-labelledby="`${id}-title`">
    <aside class="vertical__aside">
      <div class="vertical__sticky" v-reveal:left>
        <h3 :id="`${id}-title`" class="vertical__title">{{ title }}</h3>
        <p class="vertical__tagline">{{ tagline }}</p>
        <slot name="aside" />
        <div class="vertical__ctas">
          <a :href="ctaHref" target="_blank" rel="noopener" class="btn btn--primary btn--arrow">
            Falar com especialista
          </a>
          <a href="/#haas" class="link-cta" @click.prevent="go('#haas')">Ver planos</a>
        </div>
      </div>
    </aside>

    <div class="vertical__body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.vertical {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(2rem, 6vw, 6rem);
  padding-block: clamp(4rem, 8vw, 6.5rem);
  border-top: 1px solid var(--line);
}

.vertical__sticky {
  position: sticky;
  top: calc(var(--header-h) + 2rem);
}

.vertical__title {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 3.6vw, 3.25rem);
  font-weight: 500;
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.vertical__tagline {
  margin-top: 1rem;
  font-size: 1.0625rem;
  color: var(--text);
}

.vertical__ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .vertical {
    grid-template-columns: 1fr;
  }

  .vertical__sticky {
    position: static;
  }
}
</style>
