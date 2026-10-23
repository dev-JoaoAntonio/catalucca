<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';

const columns = [
  {
    title: 'Técnico',
    items: [
      { k: 'Decisão imediata', v: 'Diagnósticos em minutos, não em dias.' },
      { k: 'Redução de incerteza', v: 'Evidência visual onde o risco surge.' },
      { k: 'Antecipação', v: 'Triagem preventiva antes da falha crítica.' },
    ],
  },
  {
    title: 'Econômico',
    items: [
      { k: 'Logística', v: 'Redução drástica do envio de amostras.' },
      { k: 'Retrabalho', v: 'Menos erros por falta de informação de campo.' },
      { k: 'Eficiência fiscal', v: 'Otimização de recursos públicos e privados.' },
    ],
  },
  {
    title: 'Social',
    items: [
      { k: 'Democratização', v: 'Acesso à ciência de ponta em qualquer lugar.' },
      { k: 'Território', v: 'Fortalecimento da capacidade técnica local.' },
      { k: 'Soberania', v: 'Independência analítica para quem opera.' },
    ],
  },
];
</script>

<template>
  <section id="impacto" class="section section--soft impact" data-spy="solucoes">
    <div class="container">
      <SectionIntro index="06" label="Resultados">
        <template #title>Impacto estrutural.</template>
        Mais do que tecnologia: transformação operacional, econômica e social.
      </SectionIntro>

      <div class="impact__grid">
        <article
          v-for="(col, i) in columns"
          :key="col.title"
          class="impact__col"
          v-reveal="{ delay: i * 120 }"
        >
          <h3 class="impact__title">
            <span class="mono">0{{ i + 1 }}</span>
            Impacto {{ col.title.toLowerCase() }}
          </h3>
          <dl>
            <div v-for="item in col.items" :key="item.k" class="impact__item">
              <dt>{{ item.k }}</dt>
              <dd>{{ item.v }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: clamp(3rem, 6vw, 4.5rem);
}

.impact__col {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: var(--radius-lg);
  background: var(--bg);
  box-shadow: var(--shadow-sm);
}

.impact__title {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.impact__title .mono {
  font-size: 0.75rem;
  color: var(--accent);
}

.impact__item {
  padding: 1rem 0;
  border-top: 1px solid var(--line);
}

.impact__item dt {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--ink);
}

.impact__item dd {
  font-size: 0.9375rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .impact__grid {
    grid-template-columns: 1fr;
  }
}
</style>
