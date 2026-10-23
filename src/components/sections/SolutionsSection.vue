<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
import EducationBlock from './solutions/EducationBlock.vue';
import OperationsBlock from './solutions/OperationsBlock.vue';
import GovernmentBlock from './solutions/GovernmentBlock.vue';
import { useSectionLink } from '@/composables/useSectionLink';

const go = useSectionLink();

const fronts = [
  {
    hash: '#educacao',
    icon: 'graduation',
    title: 'Educação',
    text: 'Sistema Ø—1™ para escolas e universidades, em conformidade com a Lei nº 15.100/2025 e a BNCC.',
  },
  {
    hash: '#operacional',
    icon: 'sprout',
    title: 'Operacional privado',
    text: 'Inspeção móvel, perícia técnica e laudos com cadeia de custódia digital.',
  },
  {
    hash: '#governo',
    icon: 'landmark',
    title: 'Governo',
    text: 'Dez programas federais em um sistema, com contratação por inexigibilidade.',
  },
];
</script>

<template>
  <section id="solucoes" class="section solutions" data-spy="solucoes">
    <div class="container">
      <SectionIntro index="05" label="Soluções">
        <template #title>Uma infraestrutura, três frentes de atuação.</template>
        A mesma base técnica, com posturas distintas, adaptadas ao contexto e à pressão de decisão
        de cada operação.
      </SectionIntro>

      <ul class="fronts">
        <li v-for="(front, i) in fronts" :key="front.hash" v-reveal="{ delay: i * 100 }">
          <a :href="`/${front.hash}`" class="front" @click.prevent="go(front.hash)">
            <span class="front__icon"><AppIcon :name="front.icon" /></span>
            <h3>{{ front.title }}</h3>
            <p>{{ front.text }}</p>
            <span class="front__more">
              Ver detalhes
              <AppIcon name="arrow-right" />
            </span>
          </a>
        </li>
      </ul>

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
  gap: 1rem;
  margin: clamp(3rem, 6vw, 4.5rem) 0 clamp(4rem, 8vw, 6rem);
}

.front {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  transition:
    border-color 0.4s var(--ease),
    box-shadow 0.4s var(--ease),
    transform 0.5s var(--ease);
}

.front:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow);
  transform: translate3d(0, -4px, 0);
}

.front__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 2rem;
  border-radius: var(--radius);
  background: var(--accent-soft);
  color: var(--primary);
}

.front h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.front p {
  flex: 1;
  font-size: 0.9375rem;
  color: var(--muted);
}

.front__more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary);
}

.front__more .icon {
  width: 16px;
  height: 16px;
  transition: transform 0.4s var(--ease);
}

.front:hover .front__more .icon {
  transform: translateX(4px);
}

@media (max-width: 900px) {
  .fronts {
    grid-template-columns: 1fr;
  }
}
</style>
