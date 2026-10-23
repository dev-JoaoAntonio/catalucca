<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import EducationBlock from './solutions/EducationBlock.vue';
import OperationsBlock from './solutions/OperationsBlock.vue';
import GovernmentBlock from './solutions/GovernmentBlock.vue';
import { useSectionLink } from '@/composables/useSectionLink';

const go = useSectionLink();

const fronts = [
  {
    hash: '#educacao',
    title: 'Educação',
    text: 'Sistema Ø—1™ para escolas e universidades, em conformidade com a Lei nº 15.100/2025 e a BNCC.',
  },
  {
    hash: '#operacional',
    title: 'Operacional privado',
    text: 'Inspeção móvel, perícia técnica e laudos com cadeia de custódia digital.',
  },
  {
    hash: '#governo',
    title: 'Governo',
    text: 'Dez programas federais em um sistema, com contratação por inexigibilidade.',
  },
];
</script>

<template>
  <section id="solucoes" class="section solutions" data-spy="solucoes">
    <div class="container">
      <SectionIntro>
        <template #title>Uma infraestrutura, <em>três frentes</em> de atuação.</template>
        A mesma base técnica, com posturas distintas, adaptadas ao contexto e à pressão de decisão
        de cada operação.
      </SectionIntro>

      <ol class="fronts">
        <li v-for="(front, i) in fronts" :key="front.hash" v-reveal="{ delay: i * 100 }">
          <a :href="`/${front.hash}`" class="front" @click.prevent="go(front.hash)">
            <span class="front__num">0{{ i + 1 }}</span>
            <h3>{{ front.title }}</h3>
            <p>{{ front.text }}</p>
            <span class="front__more">Ver detalhes</span>
          </a>
        </li>
      </ol>

      <EducationBlock />
      <OperationsBlock />
      <GovernmentBlock />
    </div>
  </section>
</template>

<style scoped>
.solutions {
  padding-bottom: 0;
}

.fronts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: clamp(3rem, 6vw, 4.5rem) 0 clamp(4rem, 8vw, 6rem);
  border-top: 1px solid var(--ink);
}

.fronts li + li {
  border-left: 1px solid var(--line);
}

.front {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 2rem 2rem 0;
  transition: background-color 0.4s var(--ease);
}

.fronts li + li .front {
  padding-left: 2rem;
}

.front__num {
  margin-bottom: 2.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.front h3 {
  margin-bottom: 0.6rem;
  font-family: var(--font-display);
  font-size: clamp(1.625rem, 2.4vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  transition: color 0.3s var(--ease);
}

.front:hover h3 {
  color: var(--muted);
}

.front p {
  flex: 1;
  font-size: 0.9375rem;
  color: var(--muted);
}

/* Mesmo visual do .link-cta, acionado pelo hover do cartão inteiro. */
.front__more {
  align-self: flex-start;
  display: inline-flex;
  gap: 0.5rem;
  margin-top: 1.75rem;
  padding-bottom: 3px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink);
  background: linear-gradient(currentColor, currentColor) left bottom / 100% 1px no-repeat;
  transition: background-size 0.45s var(--ease);
}

.front__more::after {
  content: '→';
  transition: transform 0.35s var(--ease);
}

.front:hover .front__more {
  background-size: 0 1px;
  background-position: right bottom;
}

.front:hover .front__more::after {
  transform: translateX(4px);
}

@media (max-width: 900px) {
  .fronts {
    grid-template-columns: 1fr;
  }

  .fronts li + li {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .front,
  .fronts li + li .front {
    padding: 1.75rem 0;
  }
}
</style>
