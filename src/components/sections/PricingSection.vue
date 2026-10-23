<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { useSectionLink } from '@/composables/useSectionLink';
import { whatsappLink } from '@/data/contact';

const go = useSectionLink();

const plans = [
  {
    key: 'educacao',
    label: 'Educação',
    description: 'Sistema Ø—1™ para escolas e instituições de ensino.',
    tiers: ['Plano frota', 'Plano de uma unidade'],
    message: 'Olá! Gostaria de uma proposta HaaS da Catalucca para o segmento de educação.',
  },
  {
    key: 'operacional-privado',
    label: 'Operacional privado',
    description: 'Inspeção móvel, perícia técnica e cadeia de custódia para empresas.',
    tiers: ['Plano frota', 'Plano de uma unidade'],
    message: 'Olá! Gostaria de uma proposta HaaS da Catalucca para o segmento operacional privado.',
  },
  {
    key: 'governo',
    label: 'Governo',
    description: 'Inteligência territorial e vigilância sentinela para o setor público.',
    tiers: ['Plano frota', 'Plano personalizado por unidade'],
    message: 'Olá! Gostaria de uma proposta HaaS da Catalucca para o setor público.',
  },
];

const included = ['Equipamento', 'Sistema', 'Manutenção', 'Atualizações'];
const proposalLink = whatsappLink('Olá! Gostaria de uma proposta HaaS personalizada da Catalucca.');
</script>

<template>
  <section id="haas" class="section section--soft pricing" data-spy="haas">
    <div class="container">
      <div class="pricing__head">
        <SectionIntro>
          <template #title>Hardware <em>as a Service</em>.</template>
          Sem compra de equipamento e com implantação imediata. Valores ajustados conforme a escala
          e o segmento.
        </SectionIntro>

        <div class="pricing__included" v-reveal="{ delay: 200 }">
          <p class="pricing__included-label">Incluídos no contrato</p>
          <ul>
            <li v-for="item in included" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="pricing__grid">
        <article
          v-for="(plan, i) in plans"
          :key="plan.key"
          class="plan"
          v-reveal="{ delay: i * 120 }"
        >
          <span class="plan__num">0{{ i + 1 }}</span>
          <h3>{{ plan.label }}</h3>
          <p class="plan__desc">{{ plan.description }}</p>

          <ul class="check-list plan__tiers">
            <li v-for="tier in plan.tiers" :key="tier">{{ tier }}</li>
          </ul>

          <a
            :href="whatsappLink(plan.message)"
            target="_blank"
            rel="noopener"
            class="btn btn--ghost btn--arrow plan__cta"
            :aria-label="`Falar com um consultor sobre o plano ${plan.label}`"
          >
            Falar com consultor
          </a>
        </article>
      </div>

      <div class="pricing__foot" v-reveal>
        <p>
          Setup técnico único de onboarding, calibração e ativação no Hub ATLAS. Valores e prazos de
          compromisso (24 ou 48 meses) são apresentados na proposta personalizada.
        </p>
        <div class="cta-row">
          <a href="/#contato" class="btn btn--primary btn--arrow" @click.prevent="go('#contato')">
            Solicitar proposta personalizada
          </a>
          <a :href="proposalLink" target="_blank" rel="noopener" class="link-cta">Pedir pelo WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing__head {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: end;
  gap: 2rem;
}

.pricing__included {
  justify-self: end;
}

.pricing__included-label {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  letter-spacing: 0;
  color: var(--muted);
}

.pricing__included ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.25rem;
}

.pricing__included li {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.025em;
}

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: clamp(3rem, 6vw, 4rem);
}

.plan {
  display: flex;
  flex-direction: column;
  padding: clamp(1.75rem, 3vw, 2.25rem);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--bg);
  transition:
    border-color 0.4s var(--ease),
    box-shadow 0.4s var(--ease),
    opacity 0.9s var(--ease),
    transform 0.6s var(--ease);
}

.plan:hover {
  border-color: var(--ink);
  box-shadow: var(--shadow);
}

.plan__num {
  margin-bottom: 2.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.plan h3 {
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.plan__desc {
  font-size: 0.9375rem;
  color: var(--muted);
}

.plan__tiers {
  flex: 1;
  margin: 1.75rem 0 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: 0.9375rem;
  color: var(--ink);
}

.plan__cta {
  align-self: flex-start;
}

.plan:hover .plan__cta {
  background: var(--ink);
  color: #fff;
}

.pricing__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line-strong);
}

.pricing__foot p {
  max-width: 56ch;
  font-size: 0.875rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .pricing__head,
  .pricing__grid {
    grid-template-columns: 1fr;
  }

  .pricing__included {
    justify-self: start;
  }
}
</style>
