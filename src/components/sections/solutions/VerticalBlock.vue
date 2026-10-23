<script setup>
import AppIcon from '@/components/ui/AppIcon.vue';

defineProps({
  id: { type: String, required: true },
  index: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  ctaHref: { type: String, required: true },
});
</script>

<template>
  <article :id="id" class="vertical" :aria-labelledby="`${id}-title`">
    <aside class="vertical__aside">
      <div class="vertical__sticky" v-reveal:left>
        <div class="vertical__meta">
          <span class="vertical__icon"><AppIcon :name="icon" /></span>
          <span class="mono vertical__index">{{ index }}</span>
        </div>
        <h3 :id="`${id}-title`" class="vertical__title">{{ title }}</h3>
        <p class="vertical__tagline">{{ tagline }}</p>
        <slot name="aside" />
        <a :href="ctaHref" target="_blank" rel="noopener" class="btn btn--primary vertical__cta">
          Falar com especialista
          <AppIcon name="arrow-right" />
        </a>
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

.vertical__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.vertical__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius);
  background: var(--accent-soft);
  color: var(--primary);
}

.vertical__icon .icon {
  width: 24px;
  height: 24px;
}

.vertical__index {
  font-size: 0.75rem;
  color: var(--muted);
}

.vertical__title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  letter-spacing: -0.035em;
}

.vertical__tagline {
  margin-top: 0.85rem;
  font-size: 1.0625rem;
  color: var(--text);
}

.vertical__cta {
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
