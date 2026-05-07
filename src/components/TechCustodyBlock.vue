<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'custody',
    validator: (v) => ['custody', 'sovereign'].includes(v),
  },
});

const steps = [
  { n: '01', t: 'Capturar com estabilidade', d: 'Pipeline CameraX/Camera2. Foco, exposição e balanço de branco travados por código.' },
  { n: '02', t: 'Travar parâmetros', d: 'Quando o hardware não suporta trava automática, ícone de cadeado libera o disparo manualmente.' },
  { n: '03', t: 'Validar nitidez', d: 'Métrica computacional (variância, contraste, borda) decide quando a captura está pronta.' },
  { n: '04', t: 'Registrar localmente', d: 'Hash criptográfico e timestamp gerados no dispositivo, mesmo offline.' },
  { n: '05', t: 'Empilhar frames', d: 'Burst curto sob parâmetros travados. Stacking reduz ruído e aumenta nitidez efetiva.' },
  { n: '06', t: 'Gerar derivado', d: 'Imagem final preserva metadados e hashes dos frames de origem em corrente matemática.' },
  { n: '07', t: 'Preservar originais', d: 'Frames originais nunca são apagados. Permanecem como base da custódia técnica.' },
  { n: '08', t: 'Sincronizar depois', d: 'Hub ATLAS recebe registros quando há conexão, sem quebrar a cadeia de custódia.' },
];

const fields = [
  'Hash das imagens de origem',
  'Hash da imagem derivada final',
  'Timestamp da captura',
  'Parâmetros de captura (foco, ISO, exposição, WB)',
  'Identificação do dispositivo',
  'Versão do app',
  'Identificação do operador',
];

const ITEMS_PER_ROW = 3;

const stepRows = computed(() => {
  if (props.variant !== 'sovereign') return [];
  const rows = [];
  for (let i = 0; i < steps.length; i += ITEMS_PER_ROW) {
    rows.push({
      items: steps.slice(i, i + ITEMS_PER_ROW),
      reverse: rows.length % 2 === 1,
    });
  }
  return rows;
});

const pinRef = ref(null);
const timelineRef = ref(null);
const pathRef = ref(null);
const svgWidth = ref(0);
const svgHeight = ref(0);
const badgePoints = ref([]);
const pathLength = ref(0);

const scrollProgress = ref(0);

function measureLayout() {
  const root = timelineRef.value;
  if (!root) return;
  const cRect = root.getBoundingClientRect();
  svgWidth.value = cRect.width;
  svgHeight.value = cRect.height;
  const badges = root.querySelectorAll('.tech-step-number');
  const points = [];
  badges.forEach((b) => {
    const r = b.getBoundingClientRect();
    points.push({
      x: r.left - cRect.left + r.width / 2,
      y: r.top - cRect.top + r.height / 2,
    });
  });
  badgePoints.value = points;
}

function updatePathLength() {
  if (pathRef.value) {
    pathLength.value = pathRef.value.getTotalLength() || 0;
  }
}

function updateScrollProgress() {
  const pin = pinRef.value;
  if (!pin) return;
  const rect = pin.getBoundingClientRect();
  const vh = window.innerHeight;
  const startOffset = vh * 1;
  const span = rect.height - vh + startOffset;
  const scrolled = startOffset - rect.top;
  scrollProgress.value = Math.max(0, Math.min(1, span > 0 ? scrolled / span : 0));
}

const snakePath = computed(() => {
  const pts = badgePoints.value;
  if (pts.length < 2) return '';
  const w = svgWidth.value || 1;
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    if (Math.abs(prev.y - curr.y) < 5) {
      d += ` L ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
    } else {
      const onRight = prev.x > w / 2;
      const bulge = (onRight ? 1 : -1) * 80;
      const cx = prev.x + bulge;
      d += ` C ${cx.toFixed(2)} ${prev.y.toFixed(2)}, ${cx.toFixed(2)} ${curr.y.toFixed(2)}, ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
    }
  }
  return d;
});

const dashOffset = computed(() => pathLength.value * (1 - scrollProgress.value));

const stepVisible = computed(() => {
  const total = steps.length;
  return steps.map((_, idx) => {
    const threshold = (idx + 0.5) / total;
    return scrollProgress.value >= threshold;
  });
});

let resizeObserver = null;
let scrollHandler = null;

function setupObservers() {
  if (!timelineRef.value) return;
  resizeObserver = new ResizeObserver(() => {
    measureLayout();
    nextTick(updatePathLength);
  });
  resizeObserver.observe(timelineRef.value);
  timelineRef.value.querySelectorAll('.tech-step-number').forEach((b) => {
    resizeObserver.observe(b);
  });
}

onMounted(() => {
  if (props.variant !== 'sovereign') return;
  nextTick(() => {
    measureLayout();
    nextTick(() => {
      updatePathLength();
      updateScrollProgress();
    });
    setupObservers();
  });
  scrollHandler = updateScrollProgress;
  window.addEventListener('scroll', scrollHandler, { passive: true });
});

watch(stepRows, () => {
  if (props.variant !== 'sovereign') return;
  nextTick(() => {
    measureLayout();
    nextTick(updatePathLength);
  });
});

watch(badgePoints, () => {
  nextTick(updatePathLength);
}, { deep: true });

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <section class="section tech-custody-section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Protocolo Técnico LABMOB</span>
        <h2 v-if="variant === 'sovereign'" class="section-title">
          Operação Offline-first com Cadeia de Custódia Auditável
        </h2>
        <h2 v-else class="section-title">
          Cadeia de Custódia Matemática
        </h2>
        <p class="section-subtitle">
          Cada evidência é vinculada matematicamente aos seus frames originais. Stacking não-destrutivo
          como núcleo. Stitching como função secundária de visualização.
        </p>
      </div>

      <div
        v-if="variant === 'sovereign'"
        ref="pinRef"
        class="tech-timeline-pin"
      >
        <div class="tech-timeline-sticky">
          <div
            ref="timelineRef"
            class="tech-steps tech-steps--timeline"
            role="list"
          >
            <svg
              class="tech-timeline-svg"
              aria-hidden="true"
              :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
              :width="svgWidth"
              :height="svgHeight"
            >
              <path
                ref="pathRef"
                :d="snakePath"
                stroke="var(--accent)"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                :stroke-dasharray="pathLength"
                :stroke-dashoffset="dashOffset"
              />
            </svg>

            <div
              v-for="(row, ri) in stepRows"
              :key="ri"
              class="tech-timeline-row"
              :class="{ 'is-reverse': row.reverse }"
            >
              <div
                v-for="(step, si) in row.items"
                :key="step.n"
                class="tech-step"
                :class="{ 'is-visible': stepVisible[ri * 3 + si] }"
                role="listitem"
              >
                <span class="tech-step-number">{{ step.n }}</span>
                <div class="tech-step-body">
                  <h3>{{ step.t }}</h3>
                  <p>{{ step.d }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol v-else class="tech-steps">
        <li v-for="(step, idx) in steps" :key="step.n" class="tech-step" v-reveal="{ delay: idx * 90 }">
          <span class="tech-step-number">{{ step.n }}</span>
          <div class="tech-step-body">
            <h3>{{ step.t }}</h3>
            <p>{{ step.d }}</p>
          </div>
        </li>
      </ol>

      <div class="tech-custody-grid">
        <div class="tech-custody-card" v-reveal:left>
          <h3>Registro de cada captura</h3>
          <p>Cada evento é assinado localmente com os seguintes campos auditáveis:</p>
          <ul class="app-list">
            <li v-for="f in fields" :key="f">{{ f }}</li>
          </ul>
        </div>
        <div class="tech-custody-card tech-custody-card--accent" v-reveal:right="{ delay: 140 }">
          <h3>Princípio de não-destruição</h3>
          <p>
            A imagem derivada serve como produto analítico, mas os <strong>frames originais permanecem
            intactos</strong>. Se a derivada for questionada, é possível demonstrar matematicamente
            que ela vem exatamente do conjunto original capturado em campo.
          </p>
          <p>
            <strong>Stacking</strong> é o processo principal de melhoria de imagem.
            <strong>Stitching</strong> opera apenas como função secundária — não é o núcleo da
            proposta pericial.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
