<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { refreshProgress } from '@/directives/progress';
import { onLenisScroll } from '@/composables/useLenis';

const steps = [
  { t: 'Capturar com estabilidade', d: 'Pipeline CameraX/Camera2 com foco, exposição e balanço de branco travados por código.' },
  { t: 'Travar parâmetros', d: 'Quando o hardware não suporta a trava automática, um ícone de cadeado libera o disparo manual.' },
  { t: 'Validar nitidez', d: 'Uma métrica computacional (variância, contraste e borda) decide quando a captura está pronta.' },
  { t: 'Registrar localmente', d: 'Hash criptográfico e timestamp gerados no próprio dispositivo, mesmo offline.' },
  { t: 'Empilhar frames', d: 'Burst curto sob parâmetros travados. O stacking reduz o ruído e aumenta a nitidez efetiva.' },
  { t: 'Gerar derivado', d: 'A imagem final preserva os metadados e os hashes dos frames de origem em uma corrente matemática.' },
  { t: 'Preservar originais', d: 'Os frames originais nunca são apagados: permanecem como base da custódia técnica.' },
  { t: 'Sincronizar depois', d: 'O Hub ATLAS recebe os registros quando há conexão, sem quebrar a cadeia de custódia.' },
];

const fields = [
  'Hash das imagens de origem',
  'Hash da imagem derivada final',
  'Timestamp da captura',
  'Parâmetros de captura (foco, ISO, exposição e balanço de branco)',
  'Identificação do dispositivo',
  'Versão do aplicativo',
  'Identificação do operador',
];

const morfo = [
  { n: 'I', t: 'Captura na borda', d: 'Parâmetros travados por código no momento da coleta.' },
  { n: 'II', t: 'Duplo hash SHA-256', d: 'Hashes dos originais e da derivada encadeados.' },
  { n: 'III', t: 'Timestamp oficial', d: 'Ancora a evidência com fé pública técnica.' },
  { n: 'IV', t: 'Exevidência digital', d: 'Nasce blindada e com validade jurídica imediata.' },
];

const pad = (n) => String(n).padStart(2, '0');

// A trilha anda SPEED px na horizontal a cada px rolado: a seção fica mais
// curta sem acelerar demais a leitura dos cartões.
const SPEED = 1.6;

const viewportEl = ref(null);
const trackEl = ref(null);
const horizontal = ref(false);
const distance = ref(0);
const current = ref(0);

const sectionStyle = computed(() =>
  horizontal.value
    ? { height: `calc(100vh + ${Math.round(distance.value / SPEED)}px)`, '--dist': distance.value }
    : undefined
);

async function measure() {
  horizontal.value = window.matchMedia('(min-width: 900px)').matches;
  // Espera o layout horizontal ser aplicado antes de medir a trilha.
  await nextTick();
  distance.value = horizontal.value
    ? Math.max(0, trackEl.value.scrollWidth - viewportEl.value.clientWidth)
    : 0;
  refreshProgress();
}

function onProgress(p) {
  current.value = Math.round(p * (steps.length - 1));
}

// A trilha se inclina conforme a velocidade da rolagem e volta suavemente.
let skew = 0;
let skewTarget = 0;
let skewFrame = 0;

function tickSkew() {
  skew += (skewTarget - skew) * 0.14;
  skewTarget *= 0.88;
  trackEl.value?.style.setProperty('--skew', `${skew.toFixed(3)}deg`);
  skewFrame = Math.abs(skew) > 0.01 || Math.abs(skewTarget) > 0.01 ? requestAnimationFrame(tickSkew) : 0;
}

function onScrollVelocity({ velocity }) {
  if (!horizontal.value) return;
  skewTarget = Math.max(-7, Math.min(7, velocity * -0.35));
  if (!skewFrame) skewFrame = requestAnimationFrame(tickSkew);
}

let resizeObserver = null;
let offScroll = null;

onMounted(() => {
  measure();
  resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(viewportEl.value);
  offScroll = onLenisScroll(onScrollVelocity);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  offScroll?.();
  cancelAnimationFrame(skewFrame);
});
</script>

<template>
  <section
    id="protocolo"
    class="protocol"
    :class="{ 'is-horizontal': horizontal }"
    :style="sectionStyle"
    data-spy="metodo"
    v-progress="{ mode: 'pin', onProgress }"
  >
    <div class="protocol__sticky">
      <div class="container protocol__head">
        <SectionIntro>
          <template #title>Cadeia de custódia <em>matemática</em>.</template>
          Cada evidência é vinculada matematicamente aos seus frames originais. O stacking não
          destrutivo é o núcleo do processo; o stitching é apenas uma função secundária de
          visualização.
        </SectionIntro>

        <p class="protocol__counter mono" aria-hidden="true">
          <span>{{ pad(current + 1) }}</span> / {{ pad(steps.length) }}
        </p>
      </div>

      <div ref="viewportEl" class="protocol__viewport">
        <ol ref="trackEl" class="protocol__track rail-mobile">
          <li
            v-for="(step, i) in steps"
            :key="step.t"
            class="protocol__step"
            :class="{ 'is-current': horizontal && current === i, 'is-done': horizontal && current > i }"
            v-reveal="{ delay: Math.min(i, 3) * 90 }"
          >
            <span class="protocol__num">{{ pad(i + 1) }}</span>
            <h3>{{ step.t }}</h3>
            <p>{{ step.d }}</p>
          </li>
        </ol>
      </div>

      <div class="container">
        <div class="protocol__bar" aria-hidden="true"><span></span></div>
      </div>
    </div>
  </section>

  <section class="section custody" data-spy="metodo">
    <div class="container">
      <div class="custody__grid rail-mobile">
        <article class="custody__card" v-reveal>
          <h3>Registro de cada captura</h3>
          <p>Cada evento é assinado localmente com estes campos auditáveis:</p>
          <ol class="custody__fields">
            <li v-for="(field, i) in fields" :key="field">
              <span class="mono">{{ pad(i + 1) }}</span>{{ field }}
            </li>
          </ol>
        </article>

        <article class="custody__card custody__card--soft" v-reveal="{ delay: 100 }">
          <h3>Princípio da não destruição</h3>
          <p>
            A imagem derivada serve como produto analítico, mas os <strong>frames originais
            permanecem intactos</strong>. Se a derivada for questionada, é possível demonstrar
            matematicamente que ela vem exatamente do conjunto original capturado em campo.
          </p>
          <p>
            O <strong>stacking</strong> é o processo principal de melhoria de imagem. O
            <strong>stitching</strong> opera apenas como função secundária e não é o núcleo da
            proposta pericial.
          </p>
        </article>

        <article class="custody__card custody__card--ink" v-reveal="{ delay: 200 }">
          <h3 class="morfo__title" v-split>Morfofixação <em>digital</em>.</h3>
          <p>
            No instante da captura, a estrutura morfológica do analito é fixada e blindada por
            duplo hash (SHA-256) e timestamp oficial: o dado já nasce como Exevidência Digital.
          </p>
          <ol class="morfo__steps" v-progress="'read'">
            <li v-for="(step, i) in morfo" :key="step.n" :style="{ '--k': i }">
              <span class="morfo__num">{{ step.n }}</span>
              <div>
                <h4>{{ step.t }}</h4>
                <p>{{ step.d }}</p>
              </div>
            </li>
          </ol>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.protocol {
  position: relative;
  padding-top: var(--section-y);
}

.protocol__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.protocol__counter {
  display: none;
  font-size: 0.875rem;
  color: var(--muted);
  white-space: nowrap;
}

.protocol__counter span {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: -0.05em;
  color: var(--ink);
}

.protocol__viewport {
  margin-top: clamp(2rem, 4vw, 3rem);
}

.protocol__track {
  display: grid;
  gap: 1rem;
  padding-inline: var(--gutter);
  margin-inline: 0;
}

.protocol__step {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--bg);
  transition:
    border-color 0.5s var(--ease),
    box-shadow 0.5s var(--ease),
    opacity 0.9s var(--ease),
    transform 1s var(--ease);
}

.protocol__num {
  margin-bottom: 2rem;
  font-family: var(--font-display);
  font-size: 2.75rem;
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--line-strong);
  transition: color 0.5s var(--ease);
}

.protocol__step h3 {
  margin-bottom: 0.6rem;
  font-size: 1.125rem;
}

.protocol__step p {
  font-size: 0.9375rem;
  color: var(--muted);
}

.protocol__bar {
  display: none;
}

/* Desktop: a trilha corre na horizontal enquanto o palco fica fixo. */
@media (min-width: 900px) {
  .protocol.is-horizontal {
    padding-top: 0;
  }

  .is-horizontal .protocol__sticky {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding-top: var(--header-h);
    overflow: hidden;
  }

  .is-horizontal .protocol__counter {
    display: block;
  }

  .is-horizontal .protocol__track {
    display: flex;
    width: max-content;
    gap: 1.25rem;
    padding-inline: max(var(--gutter), calc((100% - var(--container)) / 2));
    transform: translate3d(calc(var(--p, 0) * var(--dist, 0) * -1px), 0, 0) skewX(var(--skew, 0deg));
    will-change: transform;
  }

  .is-horizontal .protocol__step {
    width: clamp(270px, 24vw, 330px);
    min-height: 280px;
  }

  .protocol__step.is-current {
    border-color: var(--ink);
    box-shadow: var(--shadow);
  }

  .protocol__step.is-current .protocol__num,
  .protocol__step.is-done .protocol__num {
    color: var(--ink);
  }

  .is-horizontal .protocol__bar {
    display: block;
    position: relative;
    height: 2px;
    margin-top: 2rem;
    background: var(--line);
  }

  .protocol__bar span {
    position: absolute;
    inset: 0;
    background: var(--ink);
    transform: scaleX(var(--p, 0));
    transform-origin: left;
  }
}

/* Detalhes da custódia: três colunas lado a lado */
.custody__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.custody__card {
  padding: clamp(1.5rem, 2.5vw, 2rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
}

.custody__card--soft {
  border-color: transparent;
  background: var(--bg-soft);
}

.custody__card--ink {
  border-color: var(--ink);
}

.custody__card h3 {
  margin-bottom: 0.85rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.035em;
}

.custody__card p + p {
  margin-top: 0.85rem;
}

.custody__fields {
  display: grid;
  margin-top: 1rem;
}

.custody__fields li {
  display: flex;
  gap: 0.85rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--line);
  font-size: 0.875rem;
  color: var(--ink);
}

.custody__fields .mono {
  font-size: 0.75rem;
  line-height: 1.9;
  color: var(--muted);
}

.morfo__steps {
  display: grid;
  margin-top: 1rem;
}

.morfo__steps li {
  position: relative;
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  gap: 0.5rem;
  padding: 0.6rem 0;
  border-top: 1px solid var(--line);
}

/* Cada linha acende em sequência conforme a lista atravessa a tela. */
.morfo__steps li::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transform: scaleX(clamp(0, calc(var(--p, 1) * 4.5 - var(--k)), 1));
  transform-origin: left;
}

.morfo__num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.9;
  color: var(--muted);
}

.morfo__steps h4 {
  font-size: 0.9375rem;
}

.morfo__steps p {
  font-size: 0.8125rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .custody__grid {
    grid-auto-columns: minmax(86%, 1fr) !important;
  }
}
</style>
