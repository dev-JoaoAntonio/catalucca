<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { refreshProgress } from '@/directives/progress';

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
  { n: 'I', t: 'Captura na borda', d: 'Foco, exposição e balanço de branco travados por código no momento da coleta.' },
  { n: 'II', t: 'Duplo hash SHA-256', d: 'Os hashes dos frames originais e da imagem derivada são encadeados matematicamente.' },
  { n: 'III', t: 'Timestamp oficial', d: 'Carimbo cronológico que ancora a evidência com fé pública técnica.' },
  { n: 'IV', t: 'Exevidência digital', d: 'O dado nasce blindado contra adulteração e com validade jurídica imediata.' },
];

const pad = (n) => String(n).padStart(2, '0');

const viewportEl = ref(null);
const trackEl = ref(null);
const horizontal = ref(false);
const distance = ref(0);
const current = ref(0);

// A altura da seção é a distância horizontal a percorrer + uma viewport,
// para que cada pixel rolado desloque a trilha um pixel.
const sectionStyle = computed(() =>
  horizontal.value
    ? { height: `calc(100vh + ${distance.value}px)`, '--dist': distance.value }
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

let resizeObserver = null;

onMounted(() => {
  measure();
  resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(viewportEl.value);
});

onBeforeUnmount(() => resizeObserver?.disconnect());
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
        <SectionIntro index="04" label="Protocolo técnico LABMOB">
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
        <ol ref="trackEl" class="protocol__track">
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
      <div class="custody__grid">
        <article class="custody__card" v-reveal:left>
          <h3>Registro de cada captura</h3>
          <p>Cada evento é assinado localmente com os seguintes campos auditáveis:</p>
          <ol class="custody__fields">
            <li v-for="(field, i) in fields" :key="field">
              <span class="mono">{{ pad(i + 1) }}</span>{{ field }}
            </li>
          </ol>
        </article>

        <article class="custody__card custody__card--soft" v-reveal:right="{ delay: 120 }">
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
      </div>

      <div class="morfo" v-reveal:wipe>
        <div class="morfo__intro">
          <p class="eyebrow">Diferencial técnico</p>
          <h3 class="morfo__title">Morfofixação digital.</h3>
          <p>
            No exato instante da captura, a estrutura morfológica do analito é digitalmente fixada
            e blindada por duplo hash (SHA-256) e timestamp oficial. O protocolo impede qualquer
            vetor de adulteração e garante que o dado nasça como Exevidência Digital, com fé
            pública técnica e validade jurídica imediata.
          </p>
        </div>
        <ol class="morfo__steps" v-progress="'read'">
          <li v-for="(step, i) in morfo" :key="step.n" :style="{ '--k': i }">
            <span class="morfo__num">{{ step.n }}</span>
            <div>
              <h4>{{ step.t }}</h4>
              <p>{{ step.d }}</p>
            </div>
          </li>
        </ol>
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
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.protocol__viewport {
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
}

.protocol__track {
  display: grid;
  gap: 1rem;
  padding-inline: var(--gutter);
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
  margin-bottom: 2.5rem;
  font-family: var(--font-serif);
  font-size: 2.75rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.02em;
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
    transform: translate3d(calc(var(--p, 0) * var(--dist, 0) * -1px), 0, 0);
    will-change: transform;
  }

  .is-horizontal .protocol__step {
    width: clamp(290px, 26vw, 350px);
    min-height: 300px;
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
    margin-top: 2.5rem;
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

/* Detalhes da custódia */
.custody__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.custody__card {
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
}

.custody__card--soft {
  border-color: transparent;
  background: var(--bg-soft);
}

.custody__card h3 {
  margin-bottom: 1rem;
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: -0.015em;
}

.custody__card p + p {
  margin-top: 1rem;
}

.custody__fields {
  display: grid;
  margin-top: 1.5rem;
}

.custody__fields li {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--line);
  font-size: 0.9375rem;
  color: var(--ink);
}

.custody__fields .mono {
  font-size: 0.75rem;
  line-height: 1.9;
  color: var(--muted);
}

.morfo {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(2rem, 5vw, 5rem);
  margin-top: 1.5rem;
  padding: clamp(2rem, 5vw, 4rem);
  border: 1px solid var(--ink);
  border-radius: var(--radius-sm);
}

.morfo__title {
  margin: 1rem 0 1.25rem;
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.4vw, 2.875rem);
  font-weight: 400;
  letter-spacing: -0.022em;
}

.morfo__steps {
  display: grid;
}

.morfo__steps li {
  position: relative;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 1.25rem 0;
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
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.2;
  color: var(--ink);
}

.morfo__steps h4 {
  margin-bottom: 0.35rem;
  font-size: 1.0625rem;
}

.morfo__steps p {
  font-size: 0.9375rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .custody__grid,
  .morfo {
    grid-template-columns: 1fr;
  }
}
</style>
