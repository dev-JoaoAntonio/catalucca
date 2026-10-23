<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { createModelViewer } from '@/composables/useModelViewer';
import { useSectionLink } from '@/composables/useSectionLink';
import { whatsappLink } from '@/data/contact';

const go = useSectionLink();
const demoLink = whatsappLink('Olá! Gostaria de ver o DIPLE em ação em uma demonstração técnica.');

const chapters = [
  {
    key: 'hardware',
    label: 'Hardware',
    title: 'DIPLE™, a lente de borda.',
    body: 'Óptica laboratorial em formato slim: 1.500× de ampliação nativa sobre o sensor do smartphone, sem peças móveis e sem energia externa.',
    specs: [
      { k: 'Resolução', v: '0,7\u00a0µm' },
      { k: 'Formato', v: '75 × 25 × 4 mm' },
      { k: 'Origem', v: 'SMO e IIT' },
    ],
  },
  {
    key: 'modos',
    label: 'Modos ópticos',
    title: 'Quatro leituras da mesma amostra.',
    body: 'Tecnologia patenteada de lentes asféricas para dispositivos móveis.',
    modes: [
      { name: 'Campo claro', text: 'Estruturas celulares e tecidos vegetais de alta transparência.' },
      { name: 'Campo escuro', text: 'Organismos vivos translúcidos em meio líquido.' },
      { name: 'Luz polarizada', text: 'Minerais, cristais, amido e fibras sintéticas ou naturais.' },
      { name: 'Luz refletida', text: 'Superfícies opacas, metais, microfissuras e fitossanidade foliar.' },
    ],
  },
  {
    key: 'origem',
    label: 'Origem',
    title: 'Engenharia italiana SMO + IIT.',
    body: 'As lentes DIPLE™ e BLIPS™ foram desenvolvidas em parceria com a Smart Micro Optics e o Istituto Italiano di Tecnologia. Marca notoriamente conhecida, nos termos da Lei nº 9.279/1996.',
    specs: [
      { k: 'Distribuição', v: 'Exclusiva na América do Sul' },
      { k: 'Conformidade', v: 'Lei nº 9.610/1998' },
    ],
  },
];

// Marcações do retículo decorativo atrás do modelo.
const ticks = Array.from({ length: 72 }, (_, i) => ({ angle: i * 5, long: i % 6 === 0 }));

const sectionEl = ref(null);
const canvasEl = ref(null);
const active = ref(0);
const status = ref('idle'); // idle | loading | ready | unavailable
const loaded = ref(0);

let progress = 0;
let viewer = null;
let frame = 0;
let inView = false;
let pinned = true;
let disposed = false;
let mq = null;
let loadObserver = null;
let viewObserver = null;

function onProgress(p) {
  progress = p;
  const idx = Math.min(chapters.length - 1, Math.floor(p * chapters.length));
  if (idx !== active.value) active.value = idx;
}

function tick(time) {
  frame = inView ? requestAnimationFrame(tick) : 0;
  const model = viewer?.model;
  if (!model) return;
  const t = time / 1000;
  // No desktop a rotação acompanha a rolagem; no mobile, gira sozinha.
  const turn = pinned ? -0.4 + progress * 1.6 : Math.sin(t * 0.5) * 0.7;
  model.rotation.y = turn + Math.sin(t * 0.6) * 0.05;
  model.rotation.x = Math.sin(t * 0.4) * 0.04;
  model.position.y = Math.sin(t * 0.8) * 0.05;
  viewer.render();
}

async function initViewer() {
  status.value = 'loading';
  try {
    viewer = await createModelViewer(canvasEl.value, {
      baseRotationY: (-120 * Math.PI) / 180,
      exposure: 0.55,
    });
    if (!viewer) throw new Error('WebGL indisponível');
    if (disposed) return viewer.dispose();
    await viewer.load('/models/diple.glb', (ratio) => {
      loaded.value = ratio;
    });
    if (disposed) return viewer.dispose();
    status.value = 'ready';
  } catch (err) {
    console.warn('[Tecnologia] modelo 3D indisponível', err);
    status.value = 'unavailable';
  }
}

function onMediaChange(event) {
  pinned = event.matches;
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 900px)');
  pinned = mq.matches;
  mq.addEventListener('change', onMediaChange);

  // Começa a baixar three + modelo uma viewport antes da seção.
  loadObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      loadObserver.disconnect();
      initViewer();
    },
    { rootMargin: '100% 0px' }
  );
  loadObserver.observe(sectionEl.value);

  viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView && !frame) frame = requestAnimationFrame(tick);
  });
  viewObserver.observe(sectionEl.value);
});

onBeforeUnmount(() => {
  disposed = true;
  cancelAnimationFrame(frame);
  mq?.removeEventListener('change', onMediaChange);
  loadObserver?.disconnect();
  viewObserver?.disconnect();
  viewer?.dispose();
  viewer = null;
});
</script>

<template>
  <section
    id="tecnologia"
    ref="sectionEl"
    class="tech"
    data-spy="tecnologia"
    v-progress="{ mode: 'pin', onProgress }"
  >
    <div class="tech__sticky">
      <div class="container tech__stage">
        <div class="tech__copy">
          <p class="eyebrow" v-reveal><span class="eyebrow__index">02</span>Tecnologia</p>
          <h2 class="sr-only">Tecnologia DIPLE™</h2>

          <div class="tech__chapters">
            <article
              v-for="(chapter, i) in chapters"
              :key="chapter.key"
              class="tech__chapter"
              :class="{ 'is-active': active === i, 'is-next': i > active }"
            >
              <p class="tech__kicker">
                <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ chapter.label }}
              </p>
              <h3 class="title tech__title">{{ chapter.title }}</h3>
              <p class="lead tech__body">{{ chapter.body }}</p>

              <dl v-if="chapter.specs" class="tech__specs">
                <div v-for="spec in chapter.specs" :key="spec.k">
                  <dt>{{ spec.k }}</dt>
                  <dd>{{ spec.v }}</dd>
                </div>
              </dl>

              <ul v-if="chapter.modes" class="tech__modes">
                <li v-for="mode in chapter.modes" :key="mode.name">
                  <strong>{{ mode.name }}</strong>
                  <span>{{ mode.text }}</span>
                </li>
              </ul>
            </article>
          </div>

          <ol class="tech__rail" aria-hidden="true">
            <li
              v-for="(chapter, i) in chapters"
              :key="chapter.key"
              :class="{ 'is-active': active === i }"
              :style="{ '--i': i }"
            >
              {{ chapter.label }}
            </li>
          </ol>

          <div class="cta-row tech__cta">
            <a :href="demoLink" target="_blank" rel="noopener" class="btn btn--primary btn--arrow">
              Ver o DIPLE em ação
            </a>
            <a href="/#haas" class="link-cta" @click.prevent="go('#haas')">Ver planos HaaS</a>
          </div>
        </div>

        <div class="tech__visual" v-reveal:scale>
          <svg class="tech__reticle" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="200" cy="200" r="196" />
            <circle cx="200" cy="200" r="150" class="tech__reticle-dash" />
            <circle cx="200" cy="200" r="96" />
            <line x1="200" y1="0" x2="200" y2="400" class="tech__reticle-axis" />
            <line x1="0" y1="200" x2="400" y2="200" class="tech__reticle-axis" />
            <line
              v-for="t in ticks"
              :key="t.angle"
              x1="200"
              y1="4"
              x2="200"
              :y2="t.long ? 18 : 10"
              :transform="`rotate(${t.angle} 200 200)`"
            />
          </svg>
          <span class="tech__tag tech__tag--top mono" aria-hidden="true">0,7 µm</span>
          <span class="tech__tag tech__tag--bottom mono" aria-hidden="true">1.500×</span>

          <canvas
            ref="canvasEl"
            class="tech__canvas"
            :class="{ 'is-ready': status === 'ready' }"
            role="img"
            aria-label="Modelo 3D da lente DIPLE"
          ></canvas>

          <div class="tech__fallback" :class="{ 'is-hidden': status === 'ready' }" aria-hidden="true">
            <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="diple-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3a3a3a" />
                  <stop offset="55%" stop-color="#1a1a1a" />
                  <stop offset="100%" stop-color="#050505" />
                </linearGradient>
                <radialGradient id="diple-lens" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stop-color="#9bdcff" />
                  <stop offset="45%" stop-color="#4FC3F7" />
                  <stop offset="80%" stop-color="#0277BD" />
                  <stop offset="100%" stop-color="#01579B" />
                </radialGradient>
              </defs>
              <ellipse cx="160" cy="128" rx="120" ry="8" fill="rgba(15, 62, 109, 0.14)" />
              <rect x="20" y="62" width="280" height="36" rx="6" fill="url(#diple-body)" />
              <text x="180" y="85" text-anchor="middle" fill="#eef4f8" font-family="Inter, sans-serif"
                font-weight="700" font-size="11" letter-spacing="6">DIPLE</text>
              <circle cx="70" cy="80" r="13" fill="#0a0a0a" />
              <circle cx="70" cy="80" r="11" fill="url(#diple-lens)" />
              <circle cx="66" cy="76" r="3" fill="rgba(255,255,255,0.55)" />
            </svg>
          </div>

          <p v-if="status === 'loading'" class="tech__loading mono">
            Carregando modelo 3D · {{ Math.round(loaded * 100) }}%
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech {
  position: relative;
  border-top: 1px solid var(--line);
}

.tech__sticky {
  padding-block: var(--section-y);
}

.tech__stage {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
}

.tech__chapters {
  margin-top: 1.75rem;
}

.tech__kicker {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
}

.tech__kicker .mono {
  font-size: 0.75rem;
  color: var(--ink);
}

.tech__body {
  margin-top: 1.25rem;
  max-width: 46ch;
}

.tech__specs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, auto));
  justify-content: start;
  gap: 1.5rem 2.5rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line-strong);
}

.tech__specs dt {
  margin-bottom: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.tech__specs dd {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--ink);
}

.tech__modes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 2rem;
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line-strong);
}

.tech__modes li {
  display: grid;
  align-content: start;
  gap: 0.25rem;
  font-size: 0.9375rem;
}

.tech__modes span {
  color: var(--muted);
}

.tech__rail {
  display: none;
}

.tech__cta {
  margin-top: 2rem;
}

/* Visual */
.tech__visual {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  margin-inline: auto;
}

.tech__reticle {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--ink);
  stroke-width: 1;
  opacity: 0.16;
  transform: rotate(calc(var(--p, 0) * 90deg));
}

.tech__reticle-dash {
  stroke-dasharray: 2 6;
}

.tech__reticle-axis {
  opacity: 0.4;
  stroke-dasharray: 4 8;
}

.tech__tag {
  position: absolute;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--bg);
  font-size: 0.6875rem;
  white-space: nowrap;
  color: var(--ink);
}

.tech__tag--top {
  top: 12%;
  right: 4%;
}

.tech__tag--bottom {
  bottom: 12%;
  left: 4%;
}

.tech__canvas,
.tech__fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.tech__canvas {
  opacity: 0;
  transition: opacity 1s var(--ease);
}

.tech__canvas.is-ready {
  opacity: 1;
}

.tech__fallback {
  display: grid;
  place-items: center;
  padding: 18%;
  transition: opacity 0.6s var(--ease);
}

.tech__fallback.is-hidden {
  opacity: 0;
}

.tech__loading {
  position: absolute;
  right: 0;
  bottom: 2%;
  left: 0;
  font-size: 0.6875rem;
  text-align: center;
  color: var(--muted);
}

/* Desktop: palco fixo enquanto os capítulos se alternam com a rolagem. */
@media (min-width: 900px) {
  .tech {
    height: 300vh;
  }

  .tech__sticky {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    height: 100vh;
    padding-block: calc(var(--header-h) + 1rem) 2rem;
    overflow: hidden;
  }

  .tech__stage {
    width: 100%;
  }

  .tech__visual {
    width: min(100%, calc(100vh - var(--header-h) - 4rem));
  }

  .js .tech__chapters {
    display: grid;
  }

  .js .tech__chapter {
    grid-area: 1 / 1;
    transition:
      opacity 0.5s var(--ease),
      transform 0.8s var(--ease);
  }

  .js .tech__chapter:not(.is-active) {
    opacity: 0;
    pointer-events: none;
    transform: translate3d(0, -28px, 0);
  }

  .js .tech__chapter.is-next {
    transform: translate3d(0, 28px, 0);
  }

  .js .tech__chapter.is-active {
    transition-delay: 0.12s;
  }

  .js .tech__rail {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    max-width: 420px;
    margin-top: 2rem;
  }

  .tech__rail li {
    position: relative;
    padding-top: 0.85rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted);
    transition: color 0.4s var(--ease);
  }

  .tech__rail li.is-active {
    color: var(--ink);
  }

  .tech__rail li::before,
  .tech__rail li::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--line-strong);
  }

  /* Cada trecho do trilho enche com o progresso do capítulo. */
  .tech__rail li::after {
    background: var(--ink);
    transform: scaleX(clamp(0, calc(var(--p, 0) * 3 - var(--i)), 1));
    transform-origin: left;
  }
}

@media (max-width: 899px) {
  .tech__stage {
    grid-template-columns: 1fr;
  }

  .tech__copy {
    display: contents;
  }

  .tech__copy > .eyebrow {
    order: -2;
  }

  .tech__visual {
    order: -1;
    max-width: 420px;
  }

  .tech__chapters {
    display: grid;
    gap: 3rem;
  }

  .tech__chapter + .tech__chapter {
    padding-top: 3rem;
    border-top: 1px solid var(--line);
  }
}

@media (max-width: 520px) {
  .tech__specs,
  .tech__modes {
    grid-template-columns: 1fr 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tech__reticle {
    transform: none;
  }
}
</style>
