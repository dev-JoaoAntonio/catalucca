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
  <section id="impacto" class="section impact" data-spy="solucoes">
    <div class="container">
      <SectionIntro index="06" label="Resultados">
        <template #title>Impacto <em>estrutural</em>.</template>
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
            <span>Impacto <em>{{ col.title.toLowerCase() }}</em></span>
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
.impact {
  border-top: 1px solid var(--line);
}

.impact__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: clamp(3rem, 6vw, 4.5rem);
  border-top: 1px solid var(--ink);
}

.impact__col {
  padding: 2rem 2rem 0 0;
}

.impact__col + .impact__col {
  padding-left: 2rem;
  border-left: 1px solid var(--line);
}

.impact__title {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: -0.015em;
}

.impact__title em {
  font-weight: 300;
}

.impact__title .mono {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
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

  .impact__col,
  .impact__col + .impact__col {
    padding: 2rem 0 0;
    border-left: 0;
  }
}
</style>
