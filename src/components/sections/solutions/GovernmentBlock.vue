<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import VerticalBlock from './VerticalBlock.vue';
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
  <VerticalBlock
    id="governo"
    index="05.3"
    icon="landmark"
    title="Governo"
    tagline="Inteligência territorial e vigilância sentinela para a administração pública."
    :cta-href="cta"
  >
    <template #aside>
      <div class="gov-counter" aria-hidden="true">
        <p class="gov-counter__num">
          <span>{{ pad(reached) }}</span>/{{ programs.length }}
        </p>
        <p class="gov-counter__label">programas federais em um só sistema</p>
        <div class="gov-counter__bar">
          <span :style="{ transform: `scaleX(${reached / programs.length})` }"></span>
        </div>
      </div>
    </template>

    <div class="v-stack">
      <p class="v-lead" v-reveal>
        Eficiência fiscal por meio da <strong>triagem técnica de borda</strong>: redução de até 85%
        nos custos logísticos da análise centralizada. Um único investimento atende a dez programas
        federais.
      </p>

      <div>
        <div v-reveal>
          <h4 class="v-block__title"><span class="mono">10 em 1</span>Decálogo da soberania</h4>
          <p class="v-block__text">
            Um único contrato, uma única infraestrutura de borda e dez programas federais
            convergidos no <strong>Hub ATLAS</strong>: auditáveis, georreferenciados e soberanos.
          </p>
        </div>

        <ol ref="listEl" class="programs">
          <li
            v-for="(program, i) in programs"
            :key="program.name"
            class="program"
            :class="{ 'is-active': activeIdx === i, 'is-past': activeIdx > i }"
            :data-index="i"
            v-reveal
          >
            <span class="program__code mono">{{ pad(i + 1) }}</span>
            <div class="program__main">
              <div class="program__head">
                <h5>{{ program.name }}</h5>
                <span class="program__cat">{{ program.cat }}</span>
              </div>
              <p>
                {{ program.detail }}
                <span v-if="program.law" class="program__law">({{ program.law }})</span>
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div class="v-grid gov-legal" v-reveal>
        <div class="v-item">
          <h5>Segurança jurídica</h5>
          <p>
            A implementação segue o rito da inexigibilidade de licitação (art. 74, inciso I, da Lei
            nº 14.133/2021), fundamentado na singularidade técnica da tecnologia IIT e na
            exclusividade de distribuição da Catalucca na América do Sul.
          </p>
        </div>
        <div class="v-item">
          <h5>Relatório de impacto</h5>
          <p>Ao final de cada ciclo, são geradas evidências para os sistemas federais (SIOPS/SIOPE):</p>
          <ul class="check-list">
            <li>Banco de imagens georreferenciadas (evidências de borda).</li>
            <li>Índice de cumprimento dos dez programas federais.</li>
            <li>Auditoria de eficiência fiscal.</li>
          </ul>
        </div>
      </div>
    </div>
  </VerticalBlock>
</template>

<style scoped>
.gov-counter {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.gov-counter__num {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--muted);
}

.gov-counter__num span {
  font-family: var(--font-sans);
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.gov-counter__label {
  margin: 0.25rem 0 1rem;
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
  background: var(--accent);
  transform-origin: left;
  transition: transform 0.6s var(--ease);
}

.programs {
  border-top: 1px solid var(--line);
}

.program {
  position: relative;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 1.25rem 0 1.25rem 1rem;
  border-bottom: 1px solid var(--line);
}

.program::before {
  content: '';
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: 0;
  width: 2px;
  background: var(--accent);
  transform: scaleY(0);
  transition: transform 0.5s var(--ease);
}

.program.is-active::before {
  transform: scaleY(1);
}

.program__code {
  font-size: 0.8125rem;
  line-height: 1.8;
  color: var(--muted);
  transition: color 0.4s var(--ease);
}

.program.is-active .program__code,
.program.is-past .program__code {
  color: var(--accent);
}

.program__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.35rem;
}

.program__head h5 {
  font-size: 1.0625rem;
}

.program__cat {
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--bg-soft);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text);
}

.program p {
  font-size: 0.9375rem;
  color: var(--muted);
}

.program__law {
  font-size: 0.8125rem;
  white-space: nowrap;
}

.gov-legal {
  margin-top: 0;
}

@media (max-width: 900px) {
  .gov-counter {
    display: none;
  }
}
</style>
