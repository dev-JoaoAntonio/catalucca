<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useHead } from '@unhead/vue';
import PricingMatrix from '@/components/PricingMatrix.vue';
import TechCustodyBlock from '@/components/TechCustodyBlock.vue';

const PAGE_DESC =
  '10 programas federais em 1 sistema. Triagem técnica de borda com até 85% de redução de custos logísticos. Operação offline-first com Hub ATLAS.';

useHead({
  title: 'Governo | Inteligência Territorial — CATALUCCA',
  meta: [
    { name: 'description', content: PAGE_DESC },
    { property: 'og:title', content: 'Governo | CATALUCCA' },
    { property: 'og:description', content: PAGE_DESC },
    { property: 'og:url', content: 'https://www.catalucca.com.br/governo' },
    { property: 'og:image', content: 'https://www.catalucca.com.br/images/logo-tab.jpg' },
    { name: 'twitter:title', content: 'Governo | CATALUCCA' },
    { name: 'twitter:description', content: PAGE_DESC },
    { name: 'twitter:image', content: 'https://www.catalucca.com.br/images/logo-tab.jpg' },
  ],
  link: [{ rel: 'canonical', href: 'https://www.catalucca.com.br/governo' }],
});

const programas = [
  { code: '01', name: 'BNCC / PDDE', cat: 'Educação', detail: 'Modernização do ensino de ciências com infraestrutura óptica de borda.', law: '' },
  { code: '02', name: 'Escolas Conectadas', cat: 'Educação', detail: 'Laboratório digital distribuído em sala de aula.', law: 'Dec. 11.713/23' },
  { code: '03', name: 'Brasil Alfabetizado', cat: 'Educação', detail: 'Alfabetização científica por evidência visual.', law: '' },
  { code: '04', name: 'PRONASCI II', cat: 'Segurança', detail: 'Perícia e monitoramento em áreas de risco social.', law: 'Dec. 11.436/23' },
  { code: '05', name: 'SISLAB', cat: 'Saúde', detail: 'Modernização de laboratórios locais para triagem epidemiológica.', law: '' },
  { code: '06', name: 'PSE', cat: 'Saúde', detail: 'Vigilância sentinela epidemiológica na rede escolar.', law: '' },
  { code: '07', name: 'VIGIAGUA', cat: 'Ambiente', detail: 'Vigilância da potabilidade da água em escala municipal.', law: '' },
  { code: '08', name: 'PRONAF', cat: 'Agro', detail: 'Triagem fitossanitária para a agricultura familiar.', law: '' },
  { code: '09', name: 'Bioinsumos', cat: 'Agro', detail: 'Controle de qualidade biológica e certificação técnica de campo.', law: '' },
  { code: '10', name: 'Cidades Resilientes', cat: 'Infraestrutura', detail: 'Gestão antecipada de riscos biológicos e ambientais urbanos.', law: '' },
];

const programasPinRef = ref(null);
const programasProgress = ref(0);

const programasActiveIdx = computed(() => {
  const total = programas.length;
  const idx = Math.floor(programasProgress.value * total);
  return Math.min(total - 1, Math.max(0, idx));
});

const programasCounter = computed(() => {
  const total = programas.length;
  const c = Math.round(programasProgress.value * total);
  return Math.max(0, Math.min(total, c));
});

function isProgramaVisible(idx) {
  const total = programas.length;
  const threshold = (idx + 0.35) / total;
  return programasProgress.value >= threshold;
}

function updateProgramasProgress() {
  const pin = programasPinRef.value;
  if (!pin) return;
  const rect = pin.getBoundingClientRect();
  const vh = window.innerHeight;
  const startOffset = vh * 0.6;
  const span = rect.height - vh + startOffset;
  const scrolled = startOffset - rect.top;
  programasProgress.value = Math.max(0, Math.min(1, span > 0 ? scrolled / span : 0));
}

let programasScrollHandler = null;

onMounted(() => {
  updateProgramasProgress();
  programasScrollHandler = updateProgramasProgress;
  window.addEventListener('scroll', programasScrollHandler, { passive: true });
  window.addEventListener('resize', programasScrollHandler);
});

onBeforeUnmount(() => {
  if (programasScrollHandler) {
    window.removeEventListener('scroll', programasScrollHandler);
    window.removeEventListener('resize', programasScrollHandler);
  }
});
</script>

<template>
  <section class="hero hero-grid hero-fixed">
    <div class="container">
      <div class="hero-cover">
        <h1 class="hero-title-rich" v-reveal="{ delay: 120 }">
          Inteligência Territorial<br>
          <span class="accent-gradient">e Vigilância Sentinela</span>.
        </h1>

        <p class="hero-subtitle text-white" v-reveal="{ delay: 240 }">
          Eficiência fiscal através da <strong>Triagem Técnica de Borda</strong>. Redução de
          custos logísticos de análise centralizada em até 85%. Um único investimento atende a
          10 programas federais.
        </p>
      </div>
    </div>
  </section>

  <div class="hero-overlay-stack">
    <div class="overlay-waves" aria-hidden="true">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(248, 250, 252, 0.7)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(248, 250, 252, 0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(248, 250, 252, 0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="var(--bg-body)" />
        </g>
      </svg>
    </div>

  <section class="programas-section" ref="programasPinRef" aria-label="10 Programas em 1 Sistema">
    <div class="programas-sticky">
      <div class="container">
        <div class="programas-stage">
          <aside class="programas-side">
            <span class="section-label programas-eyebrow">Decálogo da Soberania</span>
            <h2 class="programas-title">
              <span class="programas-title-num">10</span>
              <span class="programas-title-it">programas</span>
              <span class="programas-title-line">em <em>1</em> sistema</span>
            </h2>

            <div class="programas-counter">
              <div class="programas-counter-display" aria-hidden="true">
                <span class="programas-counter-num">{{ String(programasCounter).padStart(2, '0') }}</span>
                <span class="programas-counter-divider">/</span>
                <span class="programas-counter-total">10</span>
              </div>
              <span class="programas-counter-label">Programas ativados</span>
              <div class="programas-counter-bar">
                <div
                  class="programas-counter-fill"
                  :style="{ width: `${programasProgress * 100}%` }"
                ></div>
              </div>
            </div>

            <p class="programas-side-copy">
              Um único contrato. Uma única infraestrutura de borda. Dez programas federais
              convergidos no <strong>Hub ATLAS</strong> — auditáveis, georreferenciados, soberanos.
            </p>
          </aside>

          <ol class="programas-list" role="list">
            <li
              v-for="(p, idx) in programas"
              :key="p.code"
              class="programa-row"
              :class="{
                'is-visible': isProgramaVisible(idx),
                'is-active': programasActiveIdx === idx,
              }"
            >
              <span class="programa-rail" aria-hidden="true">
                <span class="programa-rail-dot"></span>
                <span class="programa-rail-line"></span>
              </span>
              <span class="programa-code">{{ p.code }}</span>
              <div class="programa-main">
                <div class="programa-head">
                  <h3 class="programa-name">{{ p.name }}</h3>
                  <span class="programa-cat" :data-cat="p.cat">{{ p.cat }}</span>
                </div>
                <p class="programa-detail">
                  {{ p.detail }}
                  <span v-if="p.law" class="programa-law">({{ p.law }})</span>
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-soft">
    <div class="container">
      <div class="about-section">
        <div class="about-content" v-reveal:left>
          <span class="section-label">Blueprint de Contratação</span>
          <h2>Segurança Jurídica</h2>
          <p>
            A implementação segue o rito da <strong>Inexigibilidade de Licitação</strong> (Art. 74,
            inciso I da Lei nº 14.133/21), fundamentada na singularidade técnica da tecnologia IIT e na
            exclusividade de distribuição da Catalucca na América do Sul.
          </p>
        </div>
        <div style="background: white; padding: 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" v-reveal:right="{ delay: 140 }">
          <h3 style="color: #2C3E50;">Relatório de Impacto</h3>
          <p>
            Ao final de cada ciclo, o sistema gera evidências para os sistemas federais (SIOPS/SIOPE):
          </p>
          <ul class="app-list">
            <li>Banco de imagens georreferenciadas (Evidências de Borda).</li>
            <li>Índice de cumprimento dos 10 Programas Federais.</li>
            <li>Auditoria de eficiência fiscal.</li>
          </ul>
          <p style="font-size: 0.8rem; margin-top: 1rem;">Fonte: Memorial de Gestão - Item 5.</p>
        </div>
      </div>
    </div>
  </section>

  <TechCustodyBlock variant="sovereign" />

  <PricingMatrix highlight="governo" />
  </div>
</template>
