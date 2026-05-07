<script setup>
import { useHead } from '@unhead/vue';
import PricingMatrix from '@/components/PricingMatrix.vue';
import TechCustodyBlock from '@/components/TechCustodyBlock.vue';

const PAGE_DESC =
  '10 programas federais em 1 sistema. Triagem técnica de borda com até 85% de redução de custos logísticos. Operação offline-first com Hub ATLAS.';

useHead({
  title: 'Governo | Inteligência Territorial — CATALUCCA',
  meta: [
    { name: 'description', content: PAGE_DESC },
    { property: 'og:title', content: 'Governo | CATALUCCA' },
    { property: 'og:description', content: PAGE_DESC },
    { property: 'og:url', content: 'https://www.catalucca.com.br/governo' },
    { property: 'og:image', content: 'https://www.catalucca.com.br/images/logo-tab.jpg' },
    { name: 'twitter:title', content: 'Governo | CATALUCCA' },
    { name: 'twitter:description', content: PAGE_DESC },
    { name: 'twitter:image', content: 'https://www.catalucca.com.br/images/logo-tab.jpg' },
  ],
  link: [{ rel: 'canonical', href: 'https://www.catalucca.com.br/governo' }],
});
</script>

<template>
  <section class="hero hero-grid hero-fixed">
    <div class="container">
      <div class="hero-cover">
        <h1 class="hero-title-rich" v-reveal="{ delay: 120 }">
          Inteligência Territorial<br>
          <span class="accent-gradient">e Vigilância Sentinela</span>.
        </h1>

        <p class="hero-subtitle text-white" v-reveal="{ delay: 240 }">
          Eficiência fiscal através da <strong>Triagem Técnica de Borda</strong>. Redução de
          custos logísticos de análise centralizada em até 85%. Um único investimento atende a
          10 programas federais.
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

  <section class="section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Decálogo da Soberania</span>
        <h2 class="section-title">10 Programas em 1 Sistema</h2>
        <p class="section-subtitle">
          O investimento é otimizado pela padronização tecnológica, atendendo aos seguintes eixos de soberania:
        </p>
      </div>

      <div class="applications-grid applications-grid--two">
        <div class="feature-card" style="text-align: left;" v-reveal="{ delay: 0 }">
          <h3 class="feature-title">01-03. Educação</h3>
          <ul class="app-list">
            <li><strong>BNCC/PDDE:</strong> Modernização do ensino de ciências.</li>
            <li><strong>Escolas Conectadas:</strong> Infraestrutura de laboratório digital (Dec. 11.713/23).</li>
            <li><strong>Brasil Alfabetizado:</strong> Alfabetização científica por evidência.</li>
          </ul>
        </div>
        <div class="feature-card" style="text-align: left;" v-reveal="{ delay: 120 }">
          <h3 class="feature-title">04. Segurança (PRONASCI II)</h3>
          <p>Perícia e monitoramento em áreas de risco (Dec. 11.436/23).</p>
        </div>
        <div class="feature-card" style="text-align: left;" v-reveal="{ delay: 240 }">
          <h3 class="feature-title">05-06. Saúde (SISLAB &amp; PSE)</h3>
          <ul class="app-list">
            <li><strong>SISLAB:</strong> Modernização de laboratórios locais para triagem.</li>
            <li><strong>PSE:</strong> Vigilância sentinela epidemiológica escolar.</li>
          </ul>
        </div>
        <div class="feature-card" style="text-align: left;" v-reveal="{ delay: 360 }">
          <h3 class="feature-title">07-10. Agro e Infraestrutura</h3>
          <ul class="app-list">
            <li><strong>VIGIAGUA:</strong> Vigilância da potabilidade da água.</li>
            <li><strong>PRONAF/Bioinsumos:</strong> Controle de qualidade biológica no campo.</li>
            <li><strong>Cidades Resilientes:</strong> Gestão de riscos biológicos urbanos.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-soft">
    <div class="container">
      <div class="about-section">
        <div class="about-content" v-reveal:left>
          <span class="section-label">Blueprint de Contratação</span>
          <h2>Segurança Jurídica</h2>
          <p>
            A implementação segue o rito da <strong>Inexigibilidade de Licitação</strong> (Art. 74,
            inciso I da Lei nº 14.133/21), fundamentada na singularidade técnica da tecnologia IIT e na
            exclusividade de distribuição da Catalucca na América do Sul.
          </p>
        </div>
        <div style="background: white; padding: 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" v-reveal:right="{ delay: 140 }">
          <h3 style="color: #2C3E50;">Relatório de Impacto</h3>
          <p>
            Ao final de cada ciclo, o sistema gera evidências para os sistemas federais (SIOPS/SIOPE):
          </p>
          <ul class="app-list">
            <li>Banco de imagens georreferenciadas (Evidências de Borda).</li>
            <li>Índice de cumprimento dos 10 Programas Federais.</li>
            <li>Auditoria de eficiência fiscal.</li>
          </ul>
          <p style="font-size: 0.8rem; margin-top: 1rem;">Fonte: Memorial de Gestão - Item 5.</p>
        </div>
      </div>
    </div>
  </section>

  <TechCustodyBlock variant="sovereign" />

  <PricingMatrix highlight="governo" />
  </div>
</template>
