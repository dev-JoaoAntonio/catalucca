<script setup>
const press = [
  {
    name: 'Forbes',
    href: 'https://www.forbes.com/sites/christinero/2023/03/13/from-neuroscience-research-to-cell-phone-microscopy/',
  },
  {
    name: 'Wired',
    href: 'https://www.wired.it/gadget/accessori/2019/12/18/kit-smartphone-microscopio-portatile/',
  },
  {
    name: 'The Verge',
    href: 'https://www.theverge.com/circuitbreaker/2019/11/21/20975677/smartphone-microscope-kickstarter-diple-announcement-magnification-zoom',
  },
  {
    name: 'Science Illustrated',
    href: 'https://smartmicrooptics.com/blips-science-illustrated/',
  },
  {
    name: 'La Repubblica',
    href: 'https://roma.repubblica.it/dossier-adv/eccellenze-lazio/2022/02/03/news/smo_-_smart_micro_optics_mira_a_espandere_la_presenza_sul_mercato-336072652/',
  },
];
</script>

<template>
  <section class="press" aria-labelledby="press-label">
    <div class="container press__inner">
      <p id="press-label" class="press__label">
        Tecnologia reconhecida<br> internacionalmente
      </p>
      <div class="press__marquee">
        <div class="press__track">
          <!-- A segunda cópia só existe para o loop contínuo. -->
          <template v-for="copy in 2" :key="copy">
            <a
              v-for="item in press"
              :key="`${copy}-${item.name}`"
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="press__item"
              :aria-hidden="copy === 2 ? 'true' : undefined"
              :tabindex="copy === 2 ? -1 : undefined"
            >{{ item.name }}</a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.press {
  padding-block: 2.5rem;
  border-bottom: 1px solid var(--line);
}

.press__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3.5rem);
}

.press__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--muted);
}

.press__marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.press__track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.press__marquee:hover .press__track,
.press__marquee:focus-within .press__track {
  animation-play-state: paused;
}

.press__item {
  padding-right: clamp(2.5rem, 5vw, 4.5rem);
  font-size: clamp(1rem, 1.6vw, 1.375rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #A3B0BF;
  transition: color 0.3s var(--ease);
}

.press__item:hover {
  color: var(--ink);
}

@keyframes marquee {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (max-width: 720px) {
  .press__inner {
    grid-template-columns: 1fr;
  }

  .press__label br {
    display: none;
  }
}
</style>
