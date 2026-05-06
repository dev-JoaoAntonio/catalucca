<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PricingMatrix from '@/components/PricingMatrix.vue';

const statsSection = ref(null);
const accordions = ref([false, false, false]);

let statsObserver = null;

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
  const duration = 2000;
  const stepTime = duration / 60;
  const increment = target / (duration / stepTime);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toFixed(decimals).replace('.', ',');
      clearInterval(timer);
    } else {
      el.textContent = current.toFixed(decimals).replace('.', ',');
    }
  }, stepTime);
}

function toggleAccordion(index) {
  accordions.value = accordions.value.map((open, i) =>
    i === index ? !open : false
  );
}

onMounted(() => {
  if (statsSection.value) {
    statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach((c) => animateCounter(c));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsSection.value);
  }
});

onBeforeUnmount(() => {
  statsObserver?.disconnect();
});
</script>

<template>
  <!-- HERO -->
  <section class="hero hero-fixed" id="home">
    <div class="video-background-container">
      <video autoplay muted loop playsinline class="video-background">
        <source src="/videos/hero.mp4" type="video/mp4">
        Seu navegador não suporta vídeos HTML5.
      </video>
      <div class="video-overlay"></div>
    </div>

    <div class="container hero-content-wrapper">
      <div class="hero-content">
        <h1 class="hero-title-rich" v-reveal="{ delay: 100 }">
          A Precisão do Laboratório.<br>
          <span class="accent-gradient">A Soberania da Decisão</span> no Território.
        </h1>
        <p class="hero-subtitle text-white" v-reveal="{ delay: 220 }">
          Resolução submicrométrica (0,7&nbsp;µm). Inteligência microvisual integrada à operação,
          à qualidade e à gestão estratégica de risco.
        </p>

        <div class="hero-actions" style="justify-content: center;" v-reveal="{ delay: 340 }">
          <router-link to="/educacao" class="btn">Conhecer Solução Educacional</router-link>
          <a
            href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20solicitar%20uma%20demonstração%20técnica."
            target="_blank"
            rel="noopener"
            class="btn btn-outline-white"
          >Solicitar Demonstração</a>
        </div>

        <div class="hero-kpi-strip" v-reveal="{ delay: 460 }">
          <span class="hero-kpi">
            <span class="hero-kpi-value">0,7<span class="unit">µm</span></span>
            Resolução óptica
          </span>
          <span class="hero-kpi">
            <span class="hero-kpi-value">1500<span class="unit">×</span></span>
            Ampliação nativa
          </span>
          <span class="hero-kpi">
            <span class="hero-kpi-value">100%</span>
            Operação offline
          </span>
        </div>
      </div>
    </div>

    <a href="#manifesto" class="hero-scroll-cue" aria-label="Rolar para o conteúdo" v-reveal:fade="{ delay: 700 }">
      <span>Explorar</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </a>
  </section>

  <!-- WRAPPER QUE COBRE O HERO FIXO AO ROLAR -->
  <div class="hero-overlay-stack">
    <!-- MARQUEE -->
    <div class="authority-marquee-section">
    <div class="container">
      <p class="marquee-label" v-reveal>Tecnologia Reconhecida Globalmente</p>
    </div>

    <div class="marquee-wrapper">
      <div class="marquee-track">
        <a href="https://www.forbes.com/sites/christinero/2023/03/13/from-neuroscience-research-to-cell-phone-microscopy/" target="_blank" rel="noopener" class="marquee-item">FORBES</a>
        <a href="https://www.wired.it/gadget/accessori/2019/12/18/kit-smartphone-microscopio-portatile/" target="_blank" rel="noopener" class="marquee-item">WIRED</a>
        <a href="https://www.theverge.com/circuitbreaker/2019/11/21/20975677/smartphone-microscope-kickstarter-diple-announcement-magnification-zoom" target="_blank" rel="noopener" class="marquee-item">THE VERGE</a>
        <a href="https://smartmicrooptics.com/blips-science-illustrated/" target="_blank" rel="noopener" class="marquee-item">SCIENCE ILLUSTRATED</a>
        <a href="https://roma.repubblica.it/dossier-adv/eccellenze-lazio/2022/02/03/news/smo_-_smart_micro_optics_mira_a_espandere_la_presenza_sul_mercato-336072652/" target="_blank" rel="noopener" class="marquee-item">LA REPUBBLICA</a>

        <a href="https://www.forbes.com/sites/christinero/2023/03/13/from-neuroscience-research-to-cell-phone-microscopy/" target="_blank" rel="noopener" class="marquee-item">FORBES</a>
        <a href="https://www.wired.it/gadget/accessori/2019/12/18/kit-smartphone-microscopio-portatile/" target="_blank" rel="noopener" class="marquee-item">WIRED</a>
        <a href="https://www.theverge.com/circuitbreaker/2019/11/21/20975677/smartphone-microscope-kickstarter-diple-announcement-magnification-zoom" target="_blank" rel="noopener" class="marquee-item">THE VERGE</a>
        <a href="https://smartmicrooptics.com/blips-science-illustrated/" target="_blank" rel="noopener" class="marquee-item">SCIENCE ILLUSTRATED</a>
        <a href="https://roma.repubblica.it/dossier-adv/eccellenze-lazio/2022/02/03/news/smo_-_smart_micro_optics_mira_a_espandere_la_presenza_sul_mercato-336072652/" target="_blank" rel="noopener" class="marquee-item">LA REPUBBLICA</a>

        <a href="https://www.forbes.com/sites/christinero/2023/03/13/from-neuroscience-research-to-cell-phone-microscopy/" target="_blank" rel="noopener" class="marquee-item">FORBES</a>
        <a href="https://www.wired.it/gadget/accessori/2019/12/18/kit-smartphone-microscopio-portatile/" target="_blank" rel="noopener" class="marquee-item">WIRED</a>
        <a href="https://www.theverge.com/circuitbreaker/2019/11/21/20975677/smartphone-microscope-kickstarter-diple-announcement-magnification-zoom" target="_blank" rel="noopener" class="marquee-item">THE VERGE</a>
      </div>
    </div>
  </div>

  <!-- COMO FUNCIONA -->
  <section class="section pipeline-section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Como Funciona</span>
        <h2 class="section-title">Pipeline LABMOB em 4 etapas</h2>
        <p class="section-subtitle">
          Da captura travada à evidência sincronizada — cada passo preserva a cadeia de custódia matemática.
        </p>
      </div>

      <div class="pipeline-grid">
        <article class="pipeline-step" v-reveal="{ delay: 0 }">
          <span class="pipeline-step-num">01</span>
          <span class="pipeline-step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </span>
          <h3>Capturar</h3>
          <p>CameraX com foco, exposição e balanço de branco travados por código. Estabilidade primeiro.</p>
        </article>

        <article class="pipeline-step" v-reveal="{ delay: 120 }">
          <span class="pipeline-step-num">02</span>
          <span class="pipeline-step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <h3>Validar</h3>
          <p>Métrica computacional de nitidez (variância, contraste, borda) decide quando capturar.</p>
        </article>

        <article class="pipeline-step" v-reveal="{ delay: 240 }">
          <span class="pipeline-step-num">03</span>
          <span class="pipeline-step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 8h18" />
              <path d="M3 13h18" />
            </svg>
          </span>
          <h3>Empilhar</h3>
          <p>Burst de frames + stacking não-destrutivo. Hash da derivada vinculado aos originais.</p>
        </article>

        <article class="pipeline-step" v-reveal="{ delay: 360 }">
          <span class="pipeline-step-num">04</span>
          <span class="pipeline-step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              <polyline points="21 4 21 10 15 10" />
            </svg>
          </span>
          <h3>Sincronizar</h3>
          <p>Hub ATLAS recebe os registros quando há rede. Cadeia de custódia preservada offline-first.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="stats-section" ref="statsSection">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item" v-reveal="{ delay: 0 }">
          <div class="stat-number-wrapper">
            <span class="stat-number" data-target="0.7" data-decimals="1">0</span>
            <span class="stat-unit">µm</span>
          </div>
          <span class="stat-label">Resolução Óptica Real</span>
        </div>
        <div class="stat-item" v-reveal="{ delay: 100 }">
          <div class="stat-number-wrapper">
            <span class="stat-number" data-target="1500" data-decimals="0">0</span>
            <span class="stat-unit">x</span>
          </div>
          <span class="stat-label">Ampliação Nativa</span>
        </div>
        <div class="stat-item" v-reveal="{ delay: 200 }">
          <div class="stat-number-wrapper">
            <span class="stat-number-static">OFF</span>
          </div>
          <span class="stat-label">Operação 100% Offline</span>
        </div>
        <div class="stat-item" v-reveal="{ delay: 300 }">
          <div class="stat-number-wrapper">
            <span class="stat-number-static">ISO</span>
          </div>
          <span class="stat-label">Conformidade Técnica</span>
        </div>
      </div>
    </div>
  </section>

  <!-- MANIFESTO -->
  <section class="section" id="manifesto">
    <div class="container">
      <div class="about-section">
        <div class="about-content" v-reveal:left>
          <span class="section-label">Nossa Essência</span>
          <h2>A Borda é o nosso Território.</h2>
          <p>
            A CATALUCCA Tecnologias™ é uma integradora nacional de infraestrutura científica aplicada.
            Nascemos de um princípio fundamental:
            <strong>a ciência perde valor quando está distante do problema</strong>.
          </p>
          <p>
            Não atuamos como fornecedores de equipamentos isolados. Atuamos como estruturadores de
            sistemas científicos operacionais, eliminando o hiato histórico entre campo e gabinete.
            Utilidade gera legitimidade.
          </p>

          <div class="about-highlight">
            <p>
              "Não substituímos o laboratório central. Levamos a capacidade de triagem técnica para
              onde a decisão precisa ser tomada."
            </p>
          </div>
        </div>

        <div
          v-reveal:right
          style="background: var(--bg-surface); padding: 2.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); box-shadow: var(--shadow-md);"
        >
          <h3 style="color: var(--primary); margin-bottom: 1.5rem;">Tecnologia Italiana (SMO &amp; IIT)</h3>
          <p style="margin-bottom: 1.5rem;">
            Tecnologias DIPLE™ e BLIPS™ desenvolvidas pela Smart Micro Optics e Istituto Italiano di
            Tecnologia. Protegidas como Marca Notoriamente Conhecida (Lei 9.279/96).
          </p>
          <ul class="app-list">
            <li><strong>Resolução:</strong> Até 0,7 µm (Resolução óptica)</li>
            <li><strong>Legalidade:</strong> Proteção Intelectual (Lei 9.610/98)</li>
            <li><strong>Exclusividade:</strong> Distribuição na América do Sul</li>
          </ul>
        </div>
      </div>

      <div style="margin-top: 6rem; padding-top: 4rem; border-top: 1px solid var(--border-color);">
        <div class="section-header" v-reveal>
          <span class="section-label">Resultados Reais</span>
          <h2 class="section-title">Impacto Estrutural</h2>
          <p class="section-subtitle">
            Mais do que tecnologia, entregamos transformação operacional, econômica e social.
          </p>
        </div>

        <div class="applications-grid">
          <article class="app-card" style="text-align: left;" v-reveal="{ delay: 0 }">
            <h3 class="feature-title" style="border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; display: inline-block;">
              Impacto Técnico
            </h3>
            <ul class="app-list" style="margin-top: 1rem;">
              <li><strong>Decisão Imediata:</strong> Diagnósticos em minutos, não dias.</li>
              <li><strong>Redução de Incerteza:</strong> Evidência visual onde o risco emerge.</li>
              <li><strong>Antecipação:</strong> Triagem preventiva antes da falha crítica.</li>
            </ul>
          </article>

          <article class="app-card" style="text-align: left;" v-reveal="{ delay: 120 }">
            <h3 class="feature-title" style="border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; display: inline-block;">
              Impacto Econômico
            </h3>
            <ul class="app-list" style="margin-top: 1rem;">
              <li><strong>Logística:</strong> Redução drástica de envio de amostras.</li>
              <li><strong>Retrabalho:</strong> Menos erros por falta de informação de campo.</li>
              <li><strong>Eficiência Fiscal:</strong> Otimização de recursos públicos e privados.</li>
            </ul>
          </article>

          <article class="app-card" style="text-align: left;" v-reveal="{ delay: 240 }">
            <h3 class="feature-title" style="border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; display: inline-block;">
              Impacto Social
            </h3>
            <ul class="app-list" style="margin-top: 1rem;">
              <li><strong>Democratização:</strong> Acesso à ciência de ponta em qualquer lugar.</li>
              <li><strong>Território:</strong> Fortalecimento da capacidade técnica local.</li>
              <li><strong>Soberania:</strong> Independência analítica para quem opera.</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- TECNOLOGIA -->
  <section class="section bg-soft" id="tecnologia">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Tecnologia</span>
        <h2 class="section-title">Smart Micro Optics</h2>
        <p class="section-subtitle">
          Tecnologia patenteada de lentes asféricas para dispositivos móveis.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card" v-reveal="{ delay: 0 }">
          <h3 class="feature-title">Campo Claro</h3>
          <p>Visualização padrão para estruturas celulares e tecidos vegetais com alta transparência.</p>
        </div>
        <div class="feature-card" v-reveal="{ delay: 100 }">
          <h3 class="feature-title">Campo Escuro</h3>
          <p>Contraste elevado para identificar organismos vivos translúcidos em meio líquido.</p>
        </div>
        <div class="feature-card" v-reveal="{ delay: 200 }">
          <h3 class="feature-title">Luz Polarizada</h3>
          <p>Análise de minerais, cristais, amido e fibras sintéticas ou naturais.</p>
        </div>
        <div class="feature-card" v-reveal="{ delay: 300 }">
          <h3 class="feature-title">Luz Refletida</h3>
          <p>Inspeção de superfícies opacas, metais, microfissuras e fitossanidade foliar.</p>
        </div>
      </div>

      <div
        v-reveal="{ delay: 200 }"
        style="margin-top: 5rem; background: white; padding: 2.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); overflow-x: auto;"
      >
        <div style="margin-bottom: 2rem; border-left: 4px solid var(--accent); padding-left: 1rem;">
          <h3 style="margin-bottom: 0.5rem; color: var(--primary);">Tabela de Equivalência de Termos</h3>
          <p style="font-size: 0.9rem; color: var(--muted-foreground); margin-bottom: 0;">
            Revisão Analítica para Contexto Brasileiro.
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; text-align: left; min-width: 600px;">
          <thead>
            <tr style="background-color: #F8FAFC; border-bottom: 2px solid var(--border-color);">
              <th style="padding: 1rem; color: var(--primary); width: 25%;">Termo Original (Inglês)</th>
              <th style="padding: 1rem; color: var(--primary); width: 30%;">Equivalente em Português (Técnico)</th>
              <th style="padding: 1rem; color: var(--primary);">Contexto Catalucca</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Bright-field</td>
              <td style="padding: 1rem; font-weight: 600;">Campo Claro</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Iluminação padrão de fundo.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Dark-field</td>
              <td style="padding: 1rem; font-weight: 600;">Campo Escuro</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Realce de contornos em amostras transparentes.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Reflected light</td>
              <td style="padding: 1rem; font-weight: 600;">Luz Refletida (Episcopia)</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Análise de superfícies opacas (metal/solo).</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Stage (Fine/Standard)</td>
              <td style="padding: 1rem; font-weight: 600;">Mesa de Apoio (Micrométrica/Padrão)</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Base de posicionamento da amostra.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Magnification</td>
              <td style="padding: 1rem; font-weight: 600;">Ampliação / Magnitude</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Poder de aumento óptico.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Science Education</td>
              <td style="padding: 1rem; font-weight: 600;">Educação Científica</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Prática pedagógica investigativa.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 1rem; font-style: italic;">Citizen Science</td>
              <td style="padding: 1rem; font-weight: 600;">Ciência Cidadã</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">Coleta de dados pela comunidade/alunos.</td>
            </tr>
            <tr>
              <td style="padding: 1rem; font-style: italic;">Citizen Scientist</td>
              <td style="padding: 1rem; font-weight: 600;">Cientista Cidadão</td>
              <td style="padding: 1rem; color: var(--muted-foreground);">O aluno como sensor do território.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- MÉTODO Ø-1 -->
  <section class="section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">O Método Ø-1™</span>
        <h2 class="section-title">Dinâmica de Resposta Imediata</h2>
        <p class="section-subtitle">A transição do vazio de informação para a evidência científica.</p>
      </div>

      <div class="problems-grid">
        <div class="problem-card" v-reveal="{ delay: 0 }">
          <span style="font-size: 3rem; font-weight: 800; color: var(--accent); display: block; margin-bottom: 1rem;">Ø</span>
          <h3>Ponto Zero</h3>
          <p>O momento da incerteza. Onde o problema ocorre, mas falta informação técnica para decidir.</p>
        </div>
        <div style="display: flex; align-items: center; justify-content: center;" v-reveal="{ delay: 150 }">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <div class="problem-card" v-reveal="{ delay: 300 }">
          <span style="font-size: 3rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 1rem;">1</span>
          <h3>Ponto Um</h3>
          <p>Evidência documentada. Cadeia de custódia com Timestamp e GPS no exato momento da observação.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SEGMENTOS -->
  <section class="section segments-section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Verticais de Atuação</span>
        <h2 class="section-title">Onde a Catalucca opera</h2>
        <p class="section-subtitle">
          Mesma infraestrutura técnica, três posturas distintas — adaptadas ao contexto e à pressão de decisão de cada operação.
        </p>
      </div>

      <div class="segments-grid">
        <router-link to="/educacao" class="segment-card" v-reveal="{ delay: 0 }">
          <span class="segment-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </span>
          <h3>Educação</h3>
          <p class="segment-card-tagline">Sistema Ø—1™ para escolas e universidades.</p>
          <ul class="segment-card-bullets">
            <li>Conformidade com a Lei 15.100/2025 e BNCC</li>
            <li>Smartphone como Estação Científica</li>
            <li>4 modos ópticos + ciência cidadã</li>
          </ul>
          <span class="segment-card-link">
            Explorar Educação
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </router-link>

        <router-link to="/operacional-privado" class="segment-card" v-reveal="{ delay: 120 }">
          <span class="segment-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.42-6.2 5-8" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
          </span>
          <h3>Operacional Privado</h3>
          <p class="segment-card-tagline">Inspeção móvel, perícia técnica e cadeia de custódia.</p>
          <ul class="segment-card-bullets">
            <li>Stacking não-destrutivo + hash em corrente</li>
            <li>Laudos com GPS e timestamp cravados</li>
            <li>Blindagem do CPF do responsável técnico</li>
          </ul>
          <span class="segment-card-link">
            Explorar Operacional
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </router-link>

        <router-link to="/governo" class="segment-card" v-reveal="{ delay: 240 }">
          <span class="segment-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" x2="21" y1="22" y2="22" />
              <line x1="6" x2="6" y1="18" y2="11" />
              <line x1="10" x2="10" y1="18" y2="11" />
              <line x1="14" x2="14" y1="18" y2="11" />
              <line x1="18" x2="18" y1="18" y2="11" />
              <polygon points="12 2 20 7 4 7" />
            </svg>
          </span>
          <h3>Governo</h3>
          <p class="segment-card-tagline">Inteligência territorial e vigilância sentinela.</p>
          <ul class="segment-card-bullets">
            <li>10 programas federais em 1 sistema</li>
            <li>Inexigibilidade de licitação (Lei 14.133/21)</li>
            <li>Operação offline + Hub ATLAS</li>
          </ul>
          <span class="segment-card-link">
            Explorar Governo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <PricingMatrix />

  <!-- FINAL CTA -->
  <section class="final-cta-section">
    <div class="container">
      <div class="final-cta-card" v-reveal:scale>
        <span class="section-label">Próximos Passos</span>
        <h2>Pronto para implantar a Catalucca na sua operação?</h2>
        <p>
          Demonstrações técnicas, propostas HaaS e suporte para projetos de educação,
          operação privada e governo. Resposta em até 1 dia útil.
        </p>
        <div class="final-cta-actions">
          <router-link to="/contato" class="btn">Solicitar Proposta</router-link>
          <a
            href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20solicitar%20uma%20demonstração%20técnica."
            target="_blank"
            rel="noopener"
            class="btn btn-outline btn-outline-white"
          >Falar no WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section" id="faq">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Estratégia</span>
        <h2 class="section-title">FAQ Estratégico</h2>
      </div>
      <div class="faq-container">
        <div
          class="accordion-item"
          v-for="(item, idx) in [
            { q: 'Substitui o laboratório central?', a: 'Não. Filtra a demanda, enviando apenas o que é crítico e acelerando a resposta de campo em até 85%.' },
            { q: 'Tem validade jurídica?', a: 'Sim. O registro possui integridade de metadados (GPS e Timestamp) para fins administrativos, fiscais e periciais.' },
            { q: 'Depende de Wi-Fi?', a: 'A captura e análise são 100% offline. A conexão serve apenas para a gestão da inteligência coletiva e sincronização posterior.' },
          ]"
          :key="idx"
          v-reveal="{ delay: idx * 100 }"
        >
          <button
            class="accordion-header"
            :class="{ active: accordions[idx] }"
            @click="toggleAccordion(idx)"
            :aria-expanded="accordions[idx] ? 'true' : 'false'"
          >
            {{ item.q }}
            <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div class="accordion-content" :style="{ maxHeight: accordions[idx] ? '500px' : null }">
            <div class="accordion-body">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <!-- /.hero-overlay-stack -->
</template>
