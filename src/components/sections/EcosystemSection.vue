<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { useSectionLink } from '@/composables/useSectionLink';
import { whatsappLink } from '@/data/contact';

const go = useSectionLink();

const factories = [
  {
    name: 'Fábrica de Cientistas',
    domain: 'Educação',
    text: 'Democratiza o rigor pericial e a cultura científica desde a educação básica, transformando estudantes em nós ativos de coleta de dados.',
  },
  {
    name: 'Fábrica de Evidências',
    domain: 'Sentinelas e defesa',
    text: 'Agentes de campo realizam vigilância e blindagem em tempo real de eixos críticos: água, terra, ar e vetores epidemiológicos.',
  },
  {
    name: 'Fábrica de Inteligência',
    domain: 'IA e análise morfológica',
    text: 'O acúmulo de dados auditáveis alimenta o Atlas Mundial de Microscopia de Borda, uma base exclusiva e livre de alucinações para treinar IA de alta fidelidade.',
  },
  {
    name: 'Fábrica de Soberania',
    domain: 'Autonomia de Estado',
    text: 'O conhecimento gerado em campo é convertido em autonomia tecnológica, sanitária e ambiental para a segurança das nações.',
  },
];

const waLink = whatsappLink('Olá! Gostaria de saber mais sobre a Catalucca.');
</script>

<template>
  <section id="ecossistema" class="section ecosystem" data-spy="solucoes">
    <div class="container ecosystem__grid">
      <div class="ecosystem__aside">
        <SectionIntro index="07" label="Ecossistema">
          <template #title>Quatro fábricas, <em>um sistema</em>.</template>
          A sustentação e a escala dessa infraestrutura acontecem pela simbiose espiral de quatro
          grandes verticais.
        </SectionIntro>
      </div>

      <ol class="factories">
        <li
          v-for="(factory, i) in factories"
          :key="factory.name"
          class="factory"
          :style="{ '--i': i }"
          v-reveal
        >
          <div class="factory__head">
            <span class="factory__num">0{{ i + 1 }}</span>
            <span class="factory__domain">{{ factory.domain }}</span>
          </div>
          <h3>{{ factory.name }}</h3>
          <p class="factory__text">{{ factory.text }}</p>
        </li>
      </ol>
    </div>

    <div class="container">
      <div class="delivery" v-reveal:scale>
        <p class="eyebrow">Modelo de entrega</p>
        <h3 class="delivery__title">
          Ciência como Serviço.<br>
          <em>Infraestrutura como Serviço.</em>
        </h3>
        <p class="delivery__text">
          Com fornecimento estritamente sob os modelos <strong>CaaS</strong> (Ciência como Serviço)
          e <strong>IaaS</strong> (Infraestrutura como Serviço), por assinatura, a Catalucca assume
          a responsabilidade contínua pela custódia, pela criptografia e pela governança dos dados,
          unindo o invisível à segurança do Estado.
        </p>
        <div class="cta-row delivery__actions">
          <a href="/#contato" class="btn btn--primary btn--arrow" @click.prevent="go('#contato')">
            Conversar com a equipe
          </a>
          <a :href="waLink" target="_blank" rel="noopener" class="link-cta">Falar no WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecosystem__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(2rem, 6vw, 6rem);
}

.ecosystem__aside {
  position: sticky;
  top: calc(var(--header-h) + 2rem);
  align-self: start;
}

/* Cartões que grudam no topo e se empilham conforme a rolagem avança. */
.factories {
  display: grid;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

.factory {
  position: sticky;
  top: calc(var(--header-h) + 2rem + var(--i) * 1.25rem);
  display: grid;
  align-content: start;
  min-height: 300px;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--bg);
  box-shadow: var(--shadow);
}

.factory:last-child {
  border-color: var(--ink);
}

.factory__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 3rem;
}

.factory__num {
  font-family: var(--font-serif);
  font-size: 2.75rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.factory__domain {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.factory h3 {
  margin-bottom: 0.85rem;
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
}

.factory__text {
  max-width: 52ch;
}

/* Modelo de entrega */
.delivery {
  margin-top: clamp(4rem, 8vw, 6rem);
  padding: clamp(2.5rem, 6vw, 5rem) 0 0;
  border-top: 1px solid var(--ink);
}

.delivery__title {
  margin: 1.25rem 0 1.5rem;
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 4.25rem);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.025em;
}

.delivery__title em {
  font-weight: 300;
}

.delivery__text {
  max-width: 62ch;
}

.delivery__actions {
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .ecosystem__grid {
    grid-template-columns: 1fr;
  }

  .ecosystem__aside {
    position: static;
  }

  .factory {
    min-height: 0;
  }
}
</style>
