<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
import { whatsappLink } from '@/data/contact';

const plans = [
  {
    key: 'educacao',
    label: 'Educação',
    icon: 'graduation',
    description: 'Sistema Ø—1™ para escolas e instituições de ensino.',
    tiers: ['Plano frota', 'Plano de uma unidade'],
    message: 'Olá! Gostaria de uma proposta HaaS da Catalucca para o segmento de educação.',
  },
  {
    key: 'operacional-privado',
    label: 'Operacional privado',
    icon: 'sprout',
    description: 'Inspeção móvel, perícia técnica e cadeia de custódia para empresas.',
    tiers: ['Plano frota', 'Plano de uma unidade'],
    message: 'Olá! Gostaria de uma proposta HaaS da Catalucca para o segmento operacional privado.',
  },
  {
    key: 'governo',
    label: 'Governo',
    icon: 'landmark',
    description: 'Inteligência territorial e vigilância sentinela para o setor público.',
    tiers: ['Plano frota', 'Plano personalizado por unidade'],
    message: 'Olá! Gostaria de uma proposta HaaS da Catalucca para o setor público.',
  },
];

const included = ['Equipamento', 'Sistema', 'Manutenção', 'Atualizações'];
</script>

<template>
  <section id="haas" class="section section--soft pricing" data-spy="haas">
    <div class="container">
      <div class="pricing__head">
        <SectionIntro index="08" label="Modelo HaaS">
          <template #title>Hardware as a Service.</template>
          Sem compra de equipamento e com implantação imediata. Valores ajustados conforme a escala
          e o segmento.
        </SectionIntro>

        <div class="pricing__included" v-reveal="{ delay: 200 }">
          <p class="pricing__included-label">Incluídos no contrato</p>
          <ul>
            <li v-for="item in included" :key="item">
              <AppIcon name="check" />
              {{ item }}
            </li>
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
          <span class="plan__icon"><AppIcon :name="plan.icon" /></span>
          <h3>{{ plan.label }}</h3>
          <p class="plan__desc">{{ plan.description }}</p>

          <ul class="plan__tiers">
            <li v-for="tier in plan.tiers" :key="tier">
              <AppIcon name="check" />
              {{ tier }}
            </li>
          </ul>

          <a
            :href="whatsappLink(plan.message)"
            target="_blank"
            rel="noopener"
            class="btn btn--ghost plan__cta"
            :aria-label="`Falar com um consultor sobre o plano ${plan.label}`"
          >
            <AppIcon name="whatsapp" />
            Falar com consultor
          </a>
        </article>
      </div>

      <p class="pricing__foot" v-reveal>
        Setup técnico único de onboarding, calibração e ativação no Hub ATLAS. Valores e prazos de
        compromisso (24 ou 48 meses) são apresentados na proposta personalizada.
      </p>
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
  display: grid;
  justify-items: end;
  gap: 0.75rem;
}

.pricing__included ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
}

.pricing__included li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: var(--bg);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
}

.pricing__included .icon {
  width: 16px;
  height: 16px;
  color: var(--accent);
}

.pricing__included-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
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
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--bg);
  transition:
    border-color 0.4s var(--ease),
    box-shadow 0.4s var(--ease),
    opacity 0.9s var(--ease),
    transform 0.6s var(--ease);
}

.plan:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow);
}

.plan__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 2rem;
  border-radius: var(--radius);
  background: var(--accent-soft);
  color: var(--primary);
}

.plan h3 {
  margin-bottom: 0.5rem;
  font-size: 1.375rem;
}

.plan__desc {
  font-size: 0.9375rem;
  color: var(--muted);
}

.plan__tiers {
  display: grid;
  gap: 0.75rem;
  flex: 1;
  margin: 1.75rem 0 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.plan__tiers li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9375rem;
  color: var(--ink);
}

.plan__tiers .icon {
  width: 18px;
  height: 18px;
  color: var(--accent);
}

.plan__cta {
  align-self: flex-start;
}

.plan__cta .icon {
  color: #25D366;
}

.plan:hover .plan__cta {
  border-color: var(--primary);
  background: var(--primary);
  color: #fff;
}

.plan__cta:hover svg {
  transform: none;
}

.pricing__foot {
  max-width: 70ch;
  margin-top: 2rem;
  font-size: 0.875rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .pricing__head,
  .pricing__grid {
    grid-template-columns: 1fr;
  }

  .pricing__included {
    justify-items: start;
  }

  .pricing__included ul {
    justify-content: flex-start;
  }
}
</style>
