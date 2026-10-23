<script setup>
import SolutionPanel from './SolutionPanel.vue';
import LazyVideo from '@/components/ui/LazyVideo.vue';
import { whatsappLink } from '@/data/contact';

const cta = whatsappLink('Olá! Gostaria de agendar uma demonstração técnica da Catalucca para a minha empresa.');

const axes = [
  {
    t: 'Qualidade e supply chain',
    items: [
      'Inspeção de microrrugosidade, fadiga e microfissuras.',
      'Pureza em alimentos e indústria farmacêutica.',
      'Auditoria técnica incontestável de fornecedores.',
    ],
  },
  {
    t: 'Seguros, perícias e laudos',
    items: [
      'Danos documentados em escala microscópica.',
      'Laudos com cadeia de custódia e GPS registrado.',
      'Prova material robusta para disputas judiciais.',
    ],
  },
  {
    t: 'Agronegócio corporativo',
    items: [
      'Classificação de grãos e análise fitossanitária.',
      'Detecção precoce de pragas em larga escala.',
      'Certificação de origem por amostragem de campo.',
    ],
  },
  {
    t: 'Engenharia, energia e infraestrutura',
    items: [
      'Inspeção de painéis fotovoltaicos e de corrosão.',
      'Manutenção preditiva, com anomalias antecipadas.',
      'Documentação as-built e conformidade técnica.',
    ],
  },
];

const roi = [
  { k: 'OPEX', d: 'Menos logística e menos dependência de laboratórios externos.' },
  { k: 'Velocidade', d: 'Diagnósticos em segundos, não em dias.' },
  { k: 'Risco', d: 'Blindagem do CPF do responsável técnico (RT).' },
  { k: 'Padrão', d: 'Excelência analítica independente da senioridade.' },
];
</script>

<template>
  <SolutionPanel
    title="Operacional privado"
    tagline="Engenharia de precisão e blindagem de processos: da visão de campo à evidência jurídica e financeira."
    :cta-href="cta"
  >
    <template #lead>
      <p class="p-lead anim" style="--k: 2">
        No setor privado, subjetividade é custo. A Catalucca™ elimina o “eu acho” da operação com
        <strong>diagnóstico visual de resolução científica (0,7&nbsp;µm)</strong>, inspeção móvel,
        auditoria georreferenciada e cadeia de custódia digital.
      </p>
      <dl class="roi anim" style="--k: 3">
        <div v-for="item in roi" :key="item.k">
          <dt>{{ item.k }}</dt>
          <dd>{{ item.d }}</dd>
        </div>
      </dl>
    </template>

    <template #side>
      <figure>
        <div class="media-card" v-reveal:wipe v-progress="'view'">
          <LazyVideo
            src="/videos/medicao.mp4"
            poster="/images/smo-celulas.jpg"
            label="Demonstração de medição e calibração em tempo real"
          />
        </div>
        <figcaption class="media-caption">
          Medição e calibração: o software afere micrômetros em tempo real, diretamente na tela do
          dispositivo. Decisões críticas passam a se basear em fatos mensuráveis, rastreáveis e
          juridicamente defensáveis.
        </figcaption>
      </figure>
    </template>

    <div class="p-cols rail-mobile anim" style="--cols: 4; --k: 5">
      <div v-for="axis in axes" :key="axis.t" class="p-col">
        <h4>{{ axis.t }}</h4>
        <ul class="check-list">
          <li v-for="item in axis.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <p class="note anim" style="--k: 6">
      <strong>Certificação técnica:</strong> equipamento de alta precisão para controle de
      processos, triagem fitossanitária e auditoria de qualidade, otimizado para a tomada de
      decisão imediata em ambiente operacional.
    </p>
  </SolutionPanel>
</template>

<style scoped>
.roi {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.5rem;
}

.roi > div {
  padding-top: 0.75rem;
  border-top: 1px solid var(--ink);
}

.roi dt {
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.roi dd {
  font-size: 0.875rem;
  color: var(--muted);
}
</style>
