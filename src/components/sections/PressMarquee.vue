<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { onLenisScroll } from '@/composables/useLenis';

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

// A faixa corre sozinha e acelera com a velocidade da rolagem, invertendo o
// sentido quando a página sobe.
const BASE_SPEED = 40; // px/s
const trackEl = ref(null);
let x = 0;
let direction = 1;
let boost = 0;
let paused = false;
let visible = false;
let last = 0;
let frame = 0;
let observer = null;
let offScroll = null;

function tick(now) {
  frame = visible ? requestAnimationFrame(tick) : 0;
  const dt = Math.min(0.05, (now - (last || now)) / 1000);
  last = now;
  boost *= 0.92;
  if (paused) return;
  const half = trackEl.value.scrollWidth / 2;
  x -= direction * (BASE_SPEED + boost) * dt;
  if (x <= -half) x += half;
  if (x > 0) x -= half;
  trackEl.value.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
}

function setPaused(value) {
  paused = value;
}

function onScroll({ velocity, direction: dir }) {
  if (dir) direction = dir;
  boost = Math.min(600, Math.abs(velocity) * 40);
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    last = 0;
    if (visible && !frame) frame = requestAnimationFrame(tick);
  });
  observer.observe(trackEl.value.parentElement);
  offScroll = onLenisScroll(onScroll);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  offScroll?.();
  cancelAnimationFrame(frame);
});
</script>

<template>
  <section class="press" aria-labelledby="press-label">
    <div class="container press__inner">
      <p id="press-label" class="press__label">
        Tecnologia reconhecida<br> internacionalmente
      </p>
      <div class="press__marquee" @mouseenter="setPaused(true)" @mouseleave="setPaused(false)">
        <div ref="trackEl" class="press__track">
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
  font-size: 0.875rem;
  letter-spacing: 0;
  line-height: 1.5;
  color: var(--muted);
}

.press__marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.press__track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.press__item {
  padding-right: clamp(2.5rem, 5vw, 4.5rem);
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 1.8vw, 1.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  white-space: nowrap;
  color: #A2A5AB;
  transition: color 0.3s var(--ease);
}

.press__item:hover {
  color: var(--ink);
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
