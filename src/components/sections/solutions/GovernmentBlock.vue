<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import SolutionPanel from './SolutionPanel.vue';
import { whatsappLink } from '@/data/contact';

const cta = whatsappLink('Olá! Gostaria de solicitar uma demonstração técnica do Sistema Ø—1™ para a minha instituição.');

const programs = [
  { name: 'BNCC / PDDE', cat: 'Educação', detail: 'Modernização do ensino de ciências com infraestrutura óptica de borda.' },
  { name: 'Escolas Conectadas', cat: 'Educação', detail: 'Laboratório digital distribuído em sala de aula.', law: 'Decreto nº 11.713/2023' },
  { name: 'Brasil Alfabetizado', cat: 'Educação', detail: 'Alfabetização científica por evidência visual.' },
  { name: 'PRONASCI II', cat: 'Segurança', detail: 'Perícia e monitoramento em áreas de risco social.', law: 'Decreto nº 11.436/2023' },
  { name: 'SISLAB', cat: 'Saúde', detail: 'Modernização de laboratórios locais para triagem epidemiológica.' },
  { name: 'PSE', cat: 'Saúde', detail: 'Vigilância sentinela epidemiológica na rede escolar.' },
  { name: 'VIGIAGUA', cat: 'Ambiente', detail: 'Vigilância da potabilidade da água em escala municipal.' },
  { name: 'PRONAF', cat: 'Agro', detail: 'Triagem fitossanitária para a agricultura familiar.' },
  { name: 'Bioinsumos', cat: 'Agro', detail: 'Controle de qualidade biológica e certificação técnica de campo.' },
  { name: 'Cidades Resilientes', cat: 'Infraestrutura', detail: 'Gestão antecipada de riscos biológicos e ambientais urbanos.' },
];

const pad = (n) => String(n).padStart(2, '0');

const listEl = ref(null);
const activeIdx = ref(-1);
const reached = computed(() => activeIdx.value + 1);
let observer = null;

// O programa que cruza o meio da tela fica ativo e alimenta o contador.
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeIdx.value = Number(entry.target.dataset.index);
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  listEl.value.querySelectorAll('[data-index]').forEach((row) => observer.observe(row));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <SolutionPanel
    title="Governo"
    tagline="Inteligência territorial e vigilância sentinela para a administração pública."
    :cta-href="cta"
  >
    <template #lead>
      <p class="p-lead anim" style="--k: 2">
        Eficiência fiscal por meio da <strong>triagem técnica de borda</strong>: até 85% menos
        custos logísticos na análise centralizada. Um contrato, uma infraestrutura e dez programas
        federais convergidos no Hub ATLAS.
      </p>
      <div class="gov-counter anim" style="--k: 3" aria-hidden="true">
        <p class="gov-counter__num"><span>{{ pad(reached) }}</span>/{{ programs.length }}</p>
        <p class="gov-counter__label">programas federais em um só sistema</p>
        <div class="gov-counter__bar">
          <span :style="{ transform: `scaleX(${reached / programs.length})` }"></span>
        </div>
      </div>
    </template>

    <template #side>
      <ol ref="listEl" class="programs">
        <li
          v-for="(program, i) in programs"
          :key="program.name"
          class="program"
          :class="{ 'is-active': activeIdx === i, 'is-past': activeIdx > i }"
          :data-index="i"
        >
          <span class="program__code mono">{{ pad(i + 1) }}</span>
          <div class="program__main">
            <h5>{{ program.name }} <span class="program__cat">{{ program.cat }}</span></h5>
            <p>
              {{ program.detail }}
              <span v-if="program.law" class="program__law">({{ program.law }})</span>
            </p>
          </div>
        </li>
      </ol>
    </template>

    <div class="p-cols rail-mobile anim" style="--cols: 2; --k: 5">
      <div class="p-col">
        <h4>Segurança jurídica</h4>
        <p>
          Implementação pelo rito da inexigibilidade de licitação (art. 74, inciso I, da Lei
          nº 14.133/2021), fundamentado na singularidade técnica da tecnologia IIT e na
          exclusividade de distribuição da Catalucca na América do Sul.
        </p>
      </div>
      <div class="p-col">
        <h4>Relatório de impacto</h4>
        <p>
          Ao fim de cada ciclo, evidências para os sistemas federais (SIOPS/SIOPE): banco de
          imagens georreferenciadas, índice de cumprimento dos dez programas e auditoria de
          eficiência fiscal.
        </p>
      </div>
    </div>
  </SolutionPanel>
</template>

<style scoped>
.gov-counter__num {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--muted);
}

.gov-counter__num span {
  font-family: var(--font-display);
  font-size: 3.25rem;
  font-weight: 300;
  letter-spacing: -0.06em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.gov-counter__label {
  margin: 0.25rem 0 0.85rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.gov-counter__bar {
  height: 2px;
  background: var(--line);
}

.gov-counter__bar span {
  display: block;
  height: 100%;
  background: var(--ink);
  transform-origin: left;
  transition: transform 0.6s var(--ease);
}

.programs {
  border-top: 1px solid var(--ink);
}

.program {
  position: relative;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 0.75rem;
  padding: 0.85rem 0 0.85rem 0.85rem;
  border-bottom: 1px solid var(--line);
}

.program::before {
  content: '';
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: 0;
  width: 2px;
  background: var(--ink);
  transform: scaleY(0);
  transition: transform 0.5s var(--ease);
}

.program.is-active::before {
  transform: scaleY(1);
}

.program__code {
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--muted);
  transition: color 0.4s var(--ease);
}

.program.is-active .program__code,
.program.is-past .program__code {
  color: var(--ink);
}

.program h5 {
  margin-bottom: 0.15rem;
  font-size: 0.9375rem;
}

.program__cat {
  margin-left: 0.4rem;
  padding: 0.05rem 0.4rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  font-size: 0.6875rem;
  font-weight: 500;
  vertical-align: 2px;
  color: var(--text);
}

.program p {
  font-size: 0.8125rem;
  color: var(--muted);
}

.program__law {
  white-space: nowrap;
}
</style>
