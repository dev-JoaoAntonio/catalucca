<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Trechos entre asteriscos ganham destaque.
const MANIFESTO =
  'A CATALUCCA Tecnologias™ é uma integradora nacional de infraestrutura científica aplicada. Nascemos de um princípio fundamental: *a ciência perde valor quando está distante do problema.*';

function splitWords(text) {
  let strong = false;
  return text.split(' ').map((raw) => {
    if (raw.startsWith('*')) strong = true;
    const word = { text: raw.replace(/\*/g, ''), strong };
    if (raw.endsWith('*')) strong = false;
    return word;
  });
}

const words = splitWords(MANIFESTO);

const stats = [
  { value: 0.7, decimals: 1, unit: 'µm', label: 'Resolução óptica real' },
  { value: 1500, decimals: 0, unit: '×', label: 'Ampliação nativa' },
  { value: 100, decimals: 0, unit: '%', label: 'Operação offline' },
  { text: 'ISO', label: 'Conformidade técnica' },
];

const format = (value, decimals) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const statsEl = ref(null);
const display = ref(stats.map((s) => (s.text ? s.text : format(s.value, s.decimals))));
let observer = null;
let frame = 0;

function countUp() {
  const start = performance.now();
  const duration = 1800;
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    display.value = stats.map((s) => (s.text ? s.text : format(s.value * eased, s.decimals)));
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
}

onMounted(() => {
  const el = statsEl.value;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // O HTML estático já traz os valores finais; só zera e anima se ainda não
  // estiverem na tela.
  if (reduced || el.getBoundingClientRect().top < window.innerHeight) return;

  display.value = stats.map((s) => (s.text ? s.text : format(0, s.decimals)));
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      countUp();
    },
    { threshold: 0.4 }
  );
  observer.observe(el);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  cancelAnimationFrame(frame);
});
</script>

<template>
  <section id="sobre" class="section about" data-spy="sobre">
    <div class="container">
      <div class="about__grid">
        <header class="about__heading">
          <p class="eyebrow" v-reveal><span class="eyebrow__index">01</span>Quem somos</p>
          <h2 class="title" v-reveal="{ delay: 80 }">A borda é o nosso território.</h2>
        </header>

        <div class="about__body">
          <p class="about__manifesto" v-progress="'read'" :style="{ '--n': words.length }">
            <template v-for="(word, i) in words" :key="i">
              <span
                class="about__word"
                :class="{ 'is-strong': word.strong }"
                :style="{ '--i': i }"
              >{{ word.text }}</span>{{ ' ' }}
            </template>
          </p>

          <div class="about__cols">
            <p v-reveal>
              Não atuamos como fornecedores de equipamentos isolados. Atuamos como estruturadores
              de sistemas científicos operacionais, eliminando o hiato histórico entre o campo e o
              gabinete. <strong>Utilidade gera legitimidade.</strong>
            </p>
            <blockquote class="about__quote" v-reveal="{ delay: 120 }">
              “Não substituímos o laboratório central. Levamos a capacidade de triagem técnica
              para onde a decisão precisa ser tomada.”
            </blockquote>
          </div>
        </div>
      </div>

      <dl ref="statsEl" class="stats">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat"
          v-reveal="{ delay: i * 100 }"
        >
          <dt class="stat__label">{{ stat.label }}</dt>
          <dd class="stat__value">
            {{ display[i] }}<span v-if="stat.unit" class="stat__unit">{{ stat.unit }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(2rem, 6vw, 6rem);
}

.about__heading {
  position: sticky;
  top: calc(var(--header-h) + 2rem);
  align-self: start;
}

.about__heading .title {
  max-width: 11ch;
  margin-top: 1.25rem;
}

.about__manifesto {
  font-size: clamp(1.5rem, 2.8vw, 2.375rem);
  font-weight: 500;
  line-height: 1.28;
  letter-spacing: -0.025em;
  color: var(--ink);
}

/* Cada palavra acende conforme o parágrafo atravessa a tela. */
.js .about__word {
  opacity: clamp(0.14, calc(var(--p, 0) * var(--n) * 1.25 - var(--i)), 1);
}

.about__word.is-strong {
  color: var(--accent);
}

.about__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
}

.about__quote {
  padding-left: 1.5rem;
  border-left: 2px solid var(--accent);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--ink);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: clamp(4rem, 8vw, 6.5rem);
}

.stat {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 2rem 1.5rem 0 0;
  border-top: 1px solid var(--line);
}

/* Linha de destaque que se desenha quando o número entra. */
.stat::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.4s var(--ease) var(--reveal-delay, 0ms);
}

.stat[data-revealed]::before {
  transform: scaleX(1);
}

.stat__value {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.stat__unit {
  margin-left: 0.12em;
  font-size: 0.45em;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--accent);
}

.stat__label {
  font-size: 0.9375rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__heading {
    position: static;
  }

  .about__cols {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .js .about__word {
    opacity: 1;
  }
}
</style>
