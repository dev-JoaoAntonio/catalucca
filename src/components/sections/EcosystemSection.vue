<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
import { useSectionLink } from '@/composables/useSectionLink';
import { whatsappLink } from '@/data/contact';

const go = useSectionLink();

const factories = [
  {
    name: 'Fábrica de Cientistas',
    domain: 'Educação',
    icon: 'graduation',
    text: 'Democratiza o rigor pericial e a cultura científica desde a educação básica, transformando estudantes em nós ativos de coleta de dados.',
  },
  {
    name: 'Fábrica de Evidências',
    domain: 'Sentinelas e defesa',
    icon: 'shield',
    text: 'Agentes de campo realizam vigilância e blindagem em tempo real de eixos críticos: água, terra, ar e vetores epidemiológicos.',
  },
  {
    name: 'Fábrica de Inteligência',
    domain: 'IA e análise morfológica',
    icon: 'brain',
    text: 'O acúmulo de dados auditáveis alimenta o Atlas Mundial de Microscopia de Borda, uma base exclusiva e livre de alucinações para treinar IA de alta fidelidade.',
  },
  {
    name: 'Fábrica de Soberania',
    domain: 'Autonomia de Estado',
    icon: 'flag',
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
          <template #title>Quatro fábricas, um sistema.</template>
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
            <span class="factory__num mono">0{{ i + 1 }}</span>
            <span class="factory__icon"><AppIcon :name="factory.icon" /></span>
          </div>
          <p class="factory__domain">{{ factory.domain }}</p>
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
          <span>Infraestrutura como Serviço.</span>
        </h3>
        <p class="delivery__text">
          Com fornecimento estritamente sob os modelos <strong>CaaS</strong> (Ciência como Serviço)
          e <strong>IaaS</strong> (Infraestrutura como Serviço), por assinatura, a Catalucca assume
          a responsabilidade contínua pela custódia, pela criptografia e pela governança dos dados,
          unindo o invisível à segurança do Estado.
        </p>
        <div class="delivery__actions">
          <a href="/#contato" class="btn btn--light" @click.prevent="go('#contato')">
            Conversar com a equipe
            <AppIcon name="arrow-right" />
          </a>
          <a :href="waLink" target="_blank" rel="noopener" class="btn btn--outline-light">
            Falar no WhatsApp
          </a>
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
  grid-template-columns: 1fr;
  min-height: 300px;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--bg);
  box-shadow: var(--shadow);
}

.factory:last-child {
  border-color: var(--primary);
  background: var(--primary);
  color: rgb(255 255 255 / 0.75);
}

.factory:last-child :is(h3, .factory__domain) {
  color: #fff;
}

.factory:last-child .factory__icon {
  background: rgb(255 255 255 / 0.12);
  color: #fff;
}

.factory__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.factory__num {
  font-size: 0.8125rem;
  color: var(--accent);
}

.factory:last-child .factory__num {
  color: var(--accent-light);
}

.factory__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--accent-soft);
  color: var(--primary);
}

.factory__domain {
  margin-bottom: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.factory h3 {
  margin-bottom: 0.85rem;
  font-size: clamp(1.375rem, 2.2vw, 1.75rem);
  letter-spacing: -0.03em;
}

.factory__text {
  max-width: 52ch;
}

/* Modelo de entrega */
.delivery {
  margin-top: clamp(4rem, 8vw, 6rem);
  padding: clamp(2.5rem, 6vw, 5rem);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(80% 120% at 100% 0%, rgb(0 140 186 / 0.35) 0%, transparent 60%),
    var(--navy-deep);
  color: rgb(255 255 255 / 0.7);
}

.delivery .eyebrow {
  color: var(--accent-light);
}

.delivery__title {
  margin: 1.25rem 0 1.5rem;
  font-size: clamp(1.875rem, 4vw, 3.25rem);
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: #fff;
}

.delivery__title span {
  color: var(--accent-light);
}

.delivery__text {
  max-width: 62ch;
}

.delivery__text strong {
  color: #fff;
}

.delivery__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
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
