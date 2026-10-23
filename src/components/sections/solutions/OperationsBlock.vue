<script setup>
import VerticalBlock from './VerticalBlock.vue';
import LazyVideo from '@/components/ui/LazyVideo.vue';
import { whatsappLink } from '@/data/contact';

const cta = whatsappLink('Olá! Gostaria de agendar uma demonstração técnica da Catalucca para a minha empresa.');

const axes = [
  {
    t: 'Controle de qualidade e supply chain',
    items: [
      'Inspeção de microrrugosidade, fadiga e microfissuras.',
      'Monitoramento de pureza (alimentos e indústria farmacêutica).',
      'Auditoria técnica incontestável de fornecedores.',
    ],
  },
  {
    t: 'Seguros, perícias e laudos',
    items: [
      'Documentação de danos em escala microscópica.',
      'Laudos com cadeia de custódia digital e GPS registrado.',
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
  <VerticalBlock
    id="operacional"
    index="05.2"
    title="Operacional privado"
    tagline="Engenharia de precisão e blindagem de processos: da visão de campo à evidência jurídica e financeira."
    :cta-href="cta"
  >
    <div class="v-stack">
      <div v-reveal>
        <p class="v-lead">
          No setor privado, subjetividade é custo. A Catalucca™ elimina o “eu acho” da operação
          com diagnóstico visual de resolução científica (0,7&nbsp;µm), integrando inspeção móvel,
          auditoria georreferenciada e cadeia de custódia digital.
        </p>
        <p class="ops__claim">
          Decisões críticas passam a se basear em fatos mensuráveis, rastreáveis e juridicamente
          defensáveis.
        </p>
      </div>

      <figure>
        <div class="media-card" v-reveal:wipe>
          <LazyVideo
            src="/videos/medicao.mp4"
            poster="/images/smo-celulas.jpg"
            label="Demonstração de medição e calibração em tempo real"
          />
        </div>
        <figcaption class="media-caption" v-reveal="{ delay: 200 }">
          Medição e calibração: o software afere micrômetros em tempo real, diretamente na tela do
          dispositivo móvel.
        </figcaption>
      </figure>

      <div v-reveal>
        <h4 class="v-block__title">Eixos de atuação</h4>
        <div class="v-grid">
          <div v-for="(axis, i) in axes" :key="axis.t" class="v-item">
            <span class="mono ops__num">0{{ i + 1 }}</span>
            <h5>{{ axis.t }}</h5>
            <ul class="check-list">
              <li v-for="item in axis.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-reveal>
        <h4 class="v-block__title">O ROI da Catalucca™</h4>
        <dl class="roi">
          <div v-for="(item, i) in roi" :key="item.k" class="roi__item" v-reveal="{ delay: i * 90 }">
            <dt>{{ item.k }}</dt>
            <dd>{{ item.d }}</dd>
          </div>
        </dl>
      </div>

      <p class="note" v-reveal>
        <strong>Certificação técnica:</strong> equipamento de alta precisão para controle de
        processos, triagem fitossanitária e auditoria de qualidade, otimizado para a tomada de
        decisão imediata em ambiente operacional.
      </p>
    </div>
  </VerticalBlock>
</template>

<style scoped>
.ops__claim {
  margin-top: 1.25rem;
  padding-left: 1.25rem;
  border-left: 1px solid var(--ink);
  font-weight: 500;
  color: var(--ink);
}

.ops__num {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--muted);
}

.roi {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.roi__item {
  padding-top: 1rem;
  border-top: 1px solid var(--ink);
}

.roi__item dt {
  margin-bottom: 0.5rem;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.015em;
  color: var(--ink);
}

.roi__item dd {
  font-size: 0.875rem;
  color: var(--muted);
}

@media (max-width: 1100px) {
  .roi {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
