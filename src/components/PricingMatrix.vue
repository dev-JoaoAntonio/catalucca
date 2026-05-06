<script setup>
defineProps({
  highlight: {
    type: String,
    default: '',
    validator: (v) => ['', 'educacao', 'operacional-privado', 'governo'].includes(v),
  },
});

const segments = [
  {
    key: 'educacao',
    label: 'Educação',
    description: 'Sistema Ø—1™ para escolas e instituições de ensino.',
    iconKey: 'graduation',
    plans: {
      frota: { m48: 149, m24: 199 },
      unit: { m48: 189, m24: 239 },
    },
  },
  {
    key: 'operacional-privado',
    label: 'Operacional Privado',
    description: 'Inspeção móvel, perícia técnica e cadeia de custódia para empresas.',
    iconKey: 'sprout',
    plans: {
      frota: { m48: 249, m24: 299 },
      unit: { m48: 289, m24: 339 },
    },
  },
  {
    key: 'governo',
    label: 'Governo',
    description: 'Inteligência territorial e vigilância sentinela para o setor público.',
    iconKey: 'landmark',
    plans: {
      frota: { m48: 349, m24: 399 },
      unit: null,
    },
  },
];

function formatBRL(value) {
  return value.toLocaleString('pt-BR');
}
</script>

<template>
  <section class="section pricing-section" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Modelo HaaS</span>
        <h2 id="pricing-heading" class="section-title">Hardware as a Service</h2>
        <p class="section-subtitle">
          Sem aquisição de equipamento. Implantação imediata. Sistema, manutenção e atualizações
          inclusos no plano mensal.
        </p>
      </div>

      <div class="pricing-setup" v-reveal:scale>
        <div class="pricing-setup-info">
          <span class="pricing-setup-label">Setup técnico (único)</span>
          <span class="pricing-setup-value">R$ 499</span>
        </div>
        <p class="pricing-setup-note">
          Onboarding, calibração e ativação no Hub ATLAS. Cobrado uma única vez por contrato.
        </p>
      </div>

      <div class="pricing-grid">
        <article
          v-for="(seg, idx) in segments"
          :key="seg.key"
          class="pricing-card"
          :class="{ 'pricing-card--highlight': highlight === seg.key }"
          v-reveal="{ delay: idx * 120 }"
        >
          <header class="pricing-card-header">
            <span class="pricing-card-icon" aria-hidden="true">
              <svg
                v-if="seg.iconKey === 'graduation'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <svg
                v-else-if="seg.iconKey === 'sprout'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.42-6.2 5-8" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
              </svg>
              <svg
                v-else-if="seg.iconKey === 'landmark'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="22" y2="22" />
                <line x1="6" x2="6" y1="18" y2="11" />
                <line x1="10" x2="10" y1="18" y2="11" />
                <line x1="14" x2="14" y1="18" y2="11" />
                <line x1="18" x2="18" y1="18" y2="11" />
                <polygon points="12 2 20 7 4 7" />
              </svg>
            </span>
            <h3>{{ seg.label }}</h3>
            <p>{{ seg.description }}</p>
          </header>

          <div class="pricing-tiers">
            <div class="pricing-tier">
              <span class="pricing-tier-label">Frota</span>
              <div class="pricing-rows">
                <div class="pricing-row">
                  <span class="pricing-row-value">R$ {{ formatBRL(seg.plans.frota.m48) }}<small>/mês</small></span>
                  <span class="pricing-row-meta">48 meses</span>
                </div>
                <div class="pricing-row">
                  <span class="pricing-row-value">R$ {{ formatBRL(seg.plans.frota.m24) }}<small>/mês</small></span>
                  <span class="pricing-row-meta">24 meses</span>
                </div>
              </div>
            </div>

            <div v-if="seg.plans.unit" class="pricing-tier">
              <span class="pricing-tier-label">1 unidade</span>
              <div class="pricing-rows">
                <div class="pricing-row">
                  <span class="pricing-row-value">R$ {{ formatBRL(seg.plans.unit.m48) }}<small>/mês</small></span>
                  <span class="pricing-row-meta">48 meses</span>
                </div>
                <div class="pricing-row">
                  <span class="pricing-row-value">R$ {{ formatBRL(seg.plans.unit.m24) }}<small>/mês</small></span>
                  <span class="pricing-row-meta">24 meses</span>
                </div>
              </div>
            </div>
            <div v-else class="pricing-tier pricing-tier--note">
              <span class="pricing-tier-label">Customizado</span>
              <p class="pricing-tier-note">Plano por unidade sob consulta — projetos vinculados a programas federais.</p>
            </div>
          </div>
        </article>
      </div>

      <div class="pricing-cta" v-reveal="{ delay: 200 }">
        <router-link to="/contato" class="btn">Solicitar Proposta</router-link>
        <a
          href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20uma%20proposta%20HaaS%20da%20Catalucca."
          target="_blank"
          rel="noopener"
          class="btn btn-outline"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
