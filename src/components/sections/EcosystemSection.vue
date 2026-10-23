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
    <div class="container">
      <SectionIntro>
        <template #title>Quatro fábricas, <em>um sistema</em>.</template>
        A sustentação e a escala dessa infraestrutura acontecem pela simbiose espiral de quatro
        grandes verticais.
      </SectionIntro>

      <ol class="factories rail-mobile">
        <li
          v-for="(factory, i) in factories"
          :key="factory.name"
          class="factory"
          v-reveal="{ delay: i * 110 }"
        >
          <span class="factory__num">0{{ i + 1 }}</span>
          <h3>{{ factory.name }}</h3>
          <p class="factory__domain">{{ factory.domain }}</p>
          <p class="factory__text">{{ factory.text }}</p>
        </li>
      </ol>

      <div class="delivery" v-progress="'read'">
        <h3 class="delivery__title" v-split="'scroll'">
          Ciência como Serviço. <em>Infraestrutura como Serviço.</em>
        </h3>
        <div class="delivery__side" v-reveal="{ delay: 150 }">
          <p class="delivery__text">
            Com fornecimento estritamente sob os modelos <strong>CaaS</strong> (Ciência como
            Serviço) e <strong>IaaS</strong> (Infraestrutura como Serviço), por assinatura, a
            Catalucca assume a responsabilidade contínua pela custódia, pela criptografia e pela
            governança dos dados, unindo o invisível à segurança do Estado.
          </p>
          <div class="cta-row">
            <a href="/#contato" class="btn btn--primary btn--arrow" @click.prevent="go('#contato')">
              Conversar com a equipe
            </a>
            <a :href="waLink" target="_blank" rel="noopener" class="link-cta">Falar no WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecosystem {
  border-top: 1px solid var(--line);
}

.factories {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
}

/* O número cresce e a régua escurece no hover. */
.factory {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-top-color: var(--ink);
  border-radius: var(--radius-sm);
  transition:
    border-color 0.4s var(--ease),
    box-shadow 0.4s var(--ease),
    opacity 0.9s var(--ease),
    transform 1s var(--ease);
}

.factory:hover {
  border-color: var(--ink);
  box-shadow: var(--shadow);
}

.factory__num {
  margin-bottom: 2rem;
  font-family: var(--font-display);
  font-size: 2.75rem;
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--line-strong);
  transition: color 0.4s var(--ease);
}

.factory:hover .factory__num {
  color: var(--ink);
}

.factory h3 {
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
  letter-spacing: -0.035em;
}

.factory__domain {
  margin-bottom: 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
}

.factory__text {
  font-size: 0.9375rem;
}

/* Modelo de entrega: o título se monta com a rolagem; texto ao lado. */
.delivery {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  align-items: end;
  gap: 1.5rem clamp(2rem, 6vw, 5rem);
  margin-top: clamp(3rem, 6vw, 4.5rem);
  padding-top: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid var(--ink);
}

.delivery__title {
  font-size: clamp(2rem, 4.2vw, 3.5rem);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.delivery__text {
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .delivery {
    grid-template-columns: 1fr;
  }
}
</style>
