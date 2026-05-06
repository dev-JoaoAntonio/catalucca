<script setup>
import PricingMatrix from '@/components/PricingMatrix.vue';
import TechCustodyBlock from '@/components/TechCustodyBlock.vue';
</script>

<template>
  <section class="hero hero-grid">
    <div class="container">
      <div class="hero-content">
        <span class="section-label" style="justify-content: center; display: flex; color: #4FC3F7;" v-reveal>
          Inteligência Operacional &amp; Compliance
        </span>
        <h1 class="hero-title" style="color: white;" v-reveal="{ delay: 120 }">Engenharia de Precisão e Blindagem de Processos</h1>
        <p class="hero-subtitle" style="color: rgba(255,255,255,0.9);" v-reveal="{ delay: 240 }">
          A última milha da inspeção técnica — da visão de campo à evidência jurídica e financeira.
        </p>
        <div class="hero-actions" style="justify-content: center;" v-reveal="{ delay: 360 }">
          <a
            href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20agendar%20uma%20demonstração%20técnica%20para%20minha%20empresa."
            target="_blank"
            rel="noopener"
            class="btn"
          >Agendar Demonstração Técnica</a>
        </div>
      </div>
    </div>
    <div class="ocean-waves-container">
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
  </section>

  <section class="section">
    <div class="container">
      <div class="about-section" style="display: flex;">
        <div class="about-content" v-reveal>
          <p style="font-style: italic; text-align: center;">
            No setor privado, subjetividade é custo. A Catalucca™ elimina o "eu acho" da operação ao
            fornecer infraestrutura de diagnóstico visual com Resolução Científica (0,7 μm), integrando
            inspeção móvel, auditoria georreferenciada e cadeia de custódia digital.
          </p>
          <p style="text-align: center;">
            <strong>Decisões críticas passam a ser baseadas em fatos mensuráveis, rastreáveis e juridicamente defensáveis.</strong>
          </p>
        </div>
      </div>

      <div style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--border-color);">
        <div class="section-header" v-reveal>
          <span class="section-label">Demonstração Prática</span>
          <h2 class="section-title">Medição e Calibração</h2>
          <p class="section-subtitle">
            Assista à precisão do software na aferição de micrômetros em tempo real.
          </p>
        </div>

        <div style="width: 100%; max-width: 900px; margin: 0 auto;" v-reveal:scale="{ delay: 100 }">
          <div
            class="video-wrapper"
            style="position: relative; padding-bottom: 56.25%; height: 0; background: black; box-shadow: var(--shadow-md); border-radius: var(--radius-md); border: 1px solid #ddd; overflow: hidden;"
          >
            <video
              autoplay muted loop playsinline
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;"
            >
              <source src="/videos/medicao.mp4" type="video/mp4">
              Seu navegador não suporta vídeos.
            </video>
          </div>
          <p style="text-align: center; font-size: 0.85rem; color: var(--muted-foreground); margin-top: 1rem;">
            O sistema realiza medições calibradas diretamente na tela do dispositivo móvel.
          </p>
        </div>
      </div>

      <div class="section-header" style="margin-top: 6rem;" v-reveal>
        <h2 class="section-title">Eixos de Atuação</h2>
      </div>

      <div class="applications-grid" style="grid-template-columns: repeat(2, 1fr);">
        <article class="app-card" v-reveal="{ delay: 0 }">
          <h3 class="feature-title">1. Controle de Qualidade &amp; Supply Chain</h3>
          <ul class="app-list">
            <li>Inspeção de microrrugosidade, fadiga e microfissuras.</li>
            <li>Monitoramento de pureza (alimentos e farmacêutica).</li>
            <li>Auditoria técnica de fornecedores incontestável.</li>
          </ul>
        </article>
        <article class="app-card" v-reveal="{ delay: 120 }">
          <h3 class="feature-title">2. Seguros, Perícias e Laudos</h3>
          <ul class="app-list">
            <li>Documentação de danos em escala microscópica.</li>
            <li>Laudos com Cadeia de Custódia Digital (GPS cravado).</li>
            <li>Prova material robusta para disputas judiciais.</li>
          </ul>
        </article>
        <article class="app-card" v-reveal="{ delay: 240 }">
          <h3 class="feature-title">3. Agronegócio Corporativo</h3>
          <ul class="app-list">
            <li>Classificação de grãos e análise fitossanitária.</li>
            <li>Detecção precoce de pragas em larga escala.</li>
            <li>Certificação de origem por amostragem de campo.</li>
          </ul>
        </article>
        <article class="app-card" v-reveal="{ delay: 360 }">
          <h3 class="feature-title">4. Engenharia, Energia &amp; Infra</h3>
          <ul class="app-list">
            <li>Inspeção de painéis fotovoltaicos e corrosão.</li>
            <li>Manutenção preditiva (anomalias antecipadas).</li>
            <li>Documentação as-built e conformidade técnica.</li>
          </ul>
        </article>
      </div>

      <div class="legal-box" v-reveal style="margin-top: 3rem; background: #FFFBEB; border-color: #F59E0B; color: #92400E;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <div>
          <strong>Certificação Técnica:</strong> Equipamento de alta precisão para controle de processos,
          triagem fitossanitária e auditoria de qualidade, otimizado para a tomada de decisão imediata
          em ambiente operacional.
        </div>
      </div>

      <div class="about-section" style="margin-top: 4rem; display: flex;">
        <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); width: 100%; border: 1px solid var(--border-color);" v-reveal:scale>
          <h3 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
            O ROI da Catalucca™ (Diferencial de Negócio)
          </h3>
          <div class="stats-grid" style="margin-top: 4rem;">
            <div class="stat-item" v-reveal="{ delay: 100 }">
              <span class="stat-number-static" style="font-size: 1.5rem; color: var(--accent);">OPEX</span>
              <p style="font-size: 0.9rem;">Menos logística e dependência de laboratórios externos.</p>
            </div>
            <div class="stat-item" v-reveal="{ delay: 200 }">
              <span class="stat-number-static" style="font-size: 1.5rem; color: var(--accent);">Velocidade</span>
              <p style="font-size: 0.9rem;">Diagnósticos em segundos, não em dias.</p>
            </div>
            <div class="stat-item" v-reveal="{ delay: 300 }">
              <span class="stat-number-static" style="font-size: 1.5rem; color: var(--accent);">Risco</span>
              <p style="font-size: 0.9rem;">Blindagem do CPF do Responsável Técnico (RT).</p>
            </div>
            <div class="stat-item" v-reveal="{ delay: 400 }">
              <span class="stat-number-static" style="font-size: 1.5rem; color: var(--accent);">Padrão</span>
              <p style="font-size: 0.9rem;">Excelência analítica independente da senioridade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <TechCustodyBlock variant="custody" />

  <PricingMatrix highlight="operacional-privado" />
</template>
