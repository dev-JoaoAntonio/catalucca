<script setup>
import { useHead } from '@unhead/vue';

const QUEM_DESCRIPTION =
  'Catalucca é a arquiteta da Exevidência Digital: BYOD + NOC central, Connected Edge Science, Morfofixação com Duplo Hash SHA-256 e Timestamp oficial.';

useHead({
  title: 'Quem Somos | CATALUCCA Tecnologias',
  meta: [
    { name: 'description', content: QUEM_DESCRIPTION },
    { property: 'og:title', content: 'Quem Somos | CATALUCCA' },
    { property: 'og:description', content: QUEM_DESCRIPTION },
    { property: 'og:url', content: 'https://www.catalucca.com.br/quem-somos' },
  ],
  link: [{ rel: 'canonical', href: 'https://www.catalucca.com.br/quem-somos' }],
});

const fabricas = [
  {
    n: '01',
    name: 'Fábrica de Cientistas',
    domain: 'Educação',
    description:
      'Democratiza o rigor pericial e a cultura científica desde a educação de base, transformando estudantes em nós ativos de coleta de dados.',
    icon: 'graduation',
  },
  {
    n: '02',
    name: 'Fábrica de Evidências',
    domain: 'Sentinelas & Defesa',
    description:
      'Agentes de campo realizam vigilância e blindagem em tempo real de eixos críticos: água, terra, ar e vetores epidemiológicos.',
    icon: 'shield',
  },
  {
    n: '03',
    name: 'Fábrica de Inteligência',
    domain: 'IA & Análise Morfológica',
    description:
      'O acúmulo de dados auditáveis alimenta o Atlas Mundial de Microscopia de Borda — base exclusiva e livre de alucinações para treinar IA de alta fidelidade.',
    icon: 'brain',
  },
  {
    n: '04',
    name: 'Fábrica de Soberania',
    domain: 'Autonomia de Estado',
    description:
      'O conhecimento gerado em campo é convertido em autonomia tecnológica, sanitária e ambiental para a segurança das nações.',
    icon: 'flag',
  },
];

const morfoSteps = [
  { n: 'I', t: 'Captura na borda', d: 'Pipeline CameraX/Camera2 com foco, exposição e balanço travados por código.' },
  { n: 'II', t: 'Duplo Hash SHA-256', d: 'Hash dos frames originais + hash da derivada compostos em corrente matemática.' },
  { n: 'III', t: 'Timestamp oficial', d: 'Carimbo cronológico que ancora a evidência em fé pública técnica.' },
  { n: 'IV', t: 'Exevidência Digital', d: 'Dado nasce blindado contra adulteração com imediata validade jurídica.' },
];

const FABRICA_DIRS = ['left', 'down', '', 'right'];
const MORFO_DIRS = ['left', 'down', '', 'right'];

function fabricaDir(idx) {
  return FABRICA_DIRS[idx % FABRICA_DIRS.length] || undefined;
}
function morfoDir(idx) {
  return MORFO_DIRS[idx % MORFO_DIRS.length] || undefined;
}
</script>

<template>
  <section class="hero hero-grid hero-fixed">
    <div class="container">
      <div class="hero-cover">
        <h1 class="hero-title-rich" v-reveal="{ delay: 120 }">
          A Arquiteta da<br>
          <span class="accent-gradient">Exevidência Digital</span>.
        </h1>

        <p class="hero-subtitle text-white" v-reveal="{ delay: 240 }">
          Não comercializamos dispositivos ópticos isolados nem soluções tecnológicas transitórias.
          <strong>Projetamos, implementamos e gerenciamos a Infraestrutura Crítica de Inteligência do Século XXI.</strong>
        </p>
      </div>
    </div>
  </section>

  <div class="hero-overlay-stack">
    <div class="overlay-waves" aria-hidden="true">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(248, 250, 252, 0.7)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(248, 250, 252, 0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(248, 250, 252, 0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="var(--bg-body)" />
        </g>
      </svg>
    </div>

    <section class="section quem-architecture">
      <div class="container">
        <div class="section-header" v-reveal>
          <span class="section-label">Arquitetura</span>
          <h2 class="section-title">
            BYOD + NOC. <span class="accent-italic">Connected Edge Science</span>.
          </h2>
          <p class="section-subtitle">
            O ecossistema Catalucca opera através de uma arquitetura descentralizada que integra o
            modelo BYOD <em>(Bring Your Own Device)</em> a um NOC central. Dispositivos móveis
            comuns se transformam em <strong>laboratórios submicrométricos de 0,7&nbsp;µm</strong>,
            operando sob a doutrina global de Ciência de Borda Conectada.
          </p>
        </div>

        <div class="quem-arch-grid">
          <div class="quem-arch-node" v-reveal:left="{ delay: 100 }">
            <span class="quem-arch-tag">Edge</span>
            <h3>Dispositivo BYOD</h3>
            <p>Smartphone do operador vira microscópio óptico calibrado em campo.</p>
          </div>
          <div class="quem-arch-link" aria-hidden="true" v-reveal:fade="{ delay: 280 }">
            <svg viewBox="0 0 80 12" preserveAspectRatio="none">
              <line x1="0" y1="6" x2="76" y2="6" stroke="currentColor" stroke-width="1.4"
                stroke-dasharray="4 4" />
              <polygon points="74,2 80,6 74,10" fill="currentColor" />
            </svg>
          </div>
          <div class="quem-arch-node" v-reveal:down="{ delay: 200 }">
            <span class="quem-arch-tag">Field-ops</span>
            <h3>Captura blindada</h3>
            <p>Parâmetros travados, hash gerado localmente, operação 100% offline.</p>
          </div>
          <div class="quem-arch-link" aria-hidden="true" v-reveal:fade="{ delay: 380 }">
            <svg viewBox="0 0 80 12" preserveAspectRatio="none">
              <line x1="0" y1="6" x2="76" y2="6" stroke="currentColor" stroke-width="1.4"
                stroke-dasharray="4 4" />
              <polygon points="74,2 80,6 74,10" fill="currentColor" />
            </svg>
          </div>
          <div class="quem-arch-node quem-arch-node--accent" v-reveal:right="{ delay: 300 }">
            <span class="quem-arch-tag">NOC</span>
            <h3>Hub ATLAS</h3>
            <p>Sincronização, governança, Atlas de Microscopia de Borda e custódia perene.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-soft quem-fabricas">
      <div class="container">
        <div class="section-header" v-reveal>
          <span class="section-label">Simbiose Espiral</span>
          <h2 class="section-title">
            <span class="accent-italic">Quatro fábricas</span>, um sistema.
          </h2>
          <p class="section-subtitle">
            A sustentação e a escala dessa infraestrutura civilizatória ocorrem através da simbiose
            espiral de suas quatro grandes verticais.
          </p>
        </div>

        <div class="quem-fabricas-grid">
          <article
            v-for="(f, idx) in fabricas"
            :key="f.n"
            class="quem-fabrica-card"
            v-reveal:[fabricaDir(idx)]="{ delay: idx * 110 }"
          >
            <header class="quem-fabrica-head">
              <span class="quem-fabrica-num">{{ f.n }}</span>
              <span class="quem-fabrica-icon" aria-hidden="true">
                <svg v-if="f.icon === 'graduation'" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <svg v-else-if="f.icon === 'shield'" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <svg v-else-if="f.icon === 'brain'" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9.5 2a2.5 2.5 0 0 0-2.5 2.5v.5a2.5 2.5 0 0 0-2 4.4A2.5 2.5 0 0 0 5 13a2.5 2.5 0 0 0 2 4 2.5 2.5 0 0 0 2.5 3 2.5 2.5 0 0 0 2.5-2.5V4.5A2.5 2.5 0 0 0 9.5 2z" />
                  <path d="M14.5 2a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1 2 4.4 2.5 2.5 0 0 1 0 3.6A2.5 2.5 0 0 1 17 17a2.5 2.5 0 0 1-2.5 3 2.5 2.5 0 0 1-2.5-2.5V4.5A2.5 2.5 0 0 1 14.5 2z" />
                </svg>
                <svg v-else-if="f.icon === 'flag'" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 22V4a1 1 0 0 1 1-1h14l-2 4 2 4H5" />
                  <line x1="4" x2="4" y1="22" y2="15" />
                </svg>
              </span>
            </header>
            <h3>{{ f.name }}</h3>
            <span class="quem-fabrica-domain">{{ f.domain }}</span>
            <p>{{ f.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section quem-morfo">
      <div class="container">
        <div class="section-header" v-reveal>
          <span class="section-label">Diferencial técnico</span>
          <h2 class="section-title">
            Morfofixação <span class="accent-italic">Digital</span>.
          </h2>
          <p class="section-subtitle">
            No exato instante da captura na borda, a estrutura morfológica do analito é
            <strong>digitalmente fixada</strong> e blindada por Duplo Hash (SHA-256) e Timestamp
            oficial. Esse protocolo impede qualquer vetor de adulteração e garante que o dado
            nasça como Exevidência Digital com <strong>fé pública técnica</strong> e imediata
            validade jurídica.
          </p>
        </div>

        <ol class="quem-morfo-flow">
          <li v-for="(step, idx) in morfoSteps" :key="step.n" v-reveal:[morfoDir(idx)]="{ delay: idx * 90 }">
            <span class="quem-morfo-num">{{ step.n }}</span>
            <h3>{{ step.t }}</h3>
            <p>{{ step.d }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section bg-soft quem-modelo">
      <div class="container">
        <div class="quem-modelo-card" v-reveal:scale>
          <span class="section-label">Modelo de Entrega</span>
          <h2>
            Ciência como Serviço. <br>
            <span class="accent-italic">Infraestrutura como Serviço</span>.
          </h2>
          <p>
            Fornecido estritamente sob o modelo <strong>CaaS</strong>
            (Ciência como Serviço) e <strong>IaaS</strong> (Infraestrutura como Serviço) por
            assinatura, a Catalucca assume responsabilidade contínua pela custódia, criptografia
            e governança de dados — unificando o invisível à segurança do Estado.
          </p>

          <div class="quem-modelo-actions">
            <router-link to="/contato" class="btn">Conversar com a equipe</router-link>
            <a
              href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20Catalucca."
              target="_blank"
              rel="noopener"
              class="btn btn-outline"
            >Falar no WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
