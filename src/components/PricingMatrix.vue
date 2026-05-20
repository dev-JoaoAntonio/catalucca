<script setup>
defineProps({
  highlight: {
    type: String,
    default: '',
    validator: (v) => ['', 'educacao', 'operacional-privado', 'governo'].includes(v),
  },
});

const PHONE = '5547999455080';

const segments = [
  {
    key: 'educacao',
    label: 'Educação',
    description: 'Sistema Ø—1™ para escolas e instituições de ensino.',
    iconKey: 'graduation',
    tiers: ['Plano Frota', 'Plano 1 unidade'],
    waMessage: 'Olá, gostaria de uma proposta HaaS Catalucca para o segmento Educação.',
  },
  {
    key: 'operacional-privado',
    label: 'Operacional Privado',
    description: 'Inspeção móvel, perícia técnica e cadeia de custódia para empresas.',
    iconKey: 'sprout',
    tiers: ['Plano Frota', 'Plano 1 unidade'],
    waMessage: 'Olá, gostaria de uma proposta HaaS Catalucca para o segmento Operacional Privado.',
  },
  {
    key: 'governo',
    label: 'Governo',
    description: 'Inteligência territorial e vigilância sentinela para o setor público.',
    iconKey: 'landmark',
    tiers: ['Plano Frota', 'Customizado por unidade'],
    waMessage: 'Olá, gostaria de uma proposta HaaS Catalucca para o setor público.',
  },
];

function buildWaLink(msg) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
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
          inclusos no contrato — valores ajustados conforme escala e segmento.
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

          <ul class="pricing-tier-list">
            <li v-for="tier in seg.tiers" :key="tier">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="m5 12 5 5L20 7" />
              </svg>
              <span>{{ tier }}</span>
            </li>
          </ul>

          <a
            :href="buildWaLink(seg.waMessage)"
            target="_blank"
            rel="noopener"
            class="pricing-wa-cta"
            :aria-label="`Falar no WhatsApp sobre ${seg.label}`"
          >
            <svg class="pricing-wa-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/>
            </svg>
            <span>Falar com consultor</span>
            <svg class="pricing-wa-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </article>
      </div>

      <p class="pricing-foot" v-reveal:fade="{ delay: 200 }">
        Setup técnico único de onboarding, calibração e ativação no Hub&nbsp;ATLAS. Valores e prazos
        de comprometimento (24 ou 48 meses) são apresentados na proposta personalizada.
      </p>
    </div>
  </section>
</template>
