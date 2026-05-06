<script setup>
import PricingMatrix from '@/components/PricingMatrix.vue';
</script>

<template>
  <section class="hero hero-grid hero-fixed">
    <div class="container">
      <div class="hero-content">
        <span class="section-label" style="justify-content: center; display: flex; color: #4FC3F7;" v-reveal>
          Ouro Pedagógico
        </span>
        <h1 class="hero-title" style="color: white;" v-reveal="{ delay: 120 }">
          Protagonismo Digital Investigativo.<br>A Ciência onde o aluno está.
        </h1>
        <p class="hero-subtitle" style="color: rgba(255,255,255,0.9);" v-reveal="{ delay: 240 }">
          Transformamos o smartphone de uma distração passiva numa Estação Científica de Alta Performance.
          Solução em conformidade com a Lei 15.100/2025.
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
      <div class="about-section">
        <div class="about-content" v-reveal:left>
          <span class="section-label">Simbiose Tecnológica</span>
          <h2 class="section-title">Veja o Sistema Ø—1™ em Operação</h2>
          <p>
            A ciência que cabe no bolso. Assista como o sistema transforma a teoria em prática
            laboratorial imediata, permitindo diagnósticos precisos em qualquer ambiente.
          </p>
          <ul class="app-list" style="margin-top: 1.5rem;">
            <li>Resolução de 0,7 micrômetros (Bactérias e Células).</li>
            <li>Integração nativa com smartphone.</li>
            <li>4 Lentes de Engenharia Óptica.</li>
          </ul>
        </div>

        <div style="flex: 1; min-width: 300px;" v-reveal:right="{ delay: 120 }">
          <div
            class="video-wrapper"
            style="position: relative; padding-bottom: 56.25%; height: 0; background: black; box-shadow: var(--shadow-md); border-radius: var(--radius-md); border: 1px solid #ddd; overflow: hidden;"
          >
            <video
              autoplay muted loop playsinline
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;"
            >
              <source src="/videos/educacao.mp4" type="video/mp4">
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-soft">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Smart Micro Optics (Itália)</span>
        <h2 class="section-title">Infraestrutura Científica de Borda</h2>
        <p class="section-subtitle">
          Ferramentas inovadoras para professores e instituições em todos os níveis pedagógicos.
        </p>
      </div>

      <div class="about-section">
        <div class="about-content" v-reveal:left>
          <h3>Apresentação Operacional</h3>
          <p>
            Oferecemos sistemas que operam em simbiose com qualquer smartphone ou tablet, transformando
            dispositivos móveis em laboratórios de alta performance. Nossa tecnologia remove as paredes
            do laboratório tradicional, levando a investigação para onde o aluno está.
          </p>

          <h3 style="margin-top: 2rem;">Campos de Aplicação</h3>
          <ul class="app-list">
            <li><strong>Biologia:</strong> Observação de células, estruturas celulares e microrganismos.</li>
            <li><strong>Ciência dos Materiais:</strong> Análise de microestruturas e cristais.</li>
            <li><strong>Ciências Ambientais:</strong> Identificação de microplásticos e ecossistemas.</li>
            <li><strong>Botânica:</strong> Estudo de pólens e tecidos vegetais.</li>
          </ul>
        </div>

        <div v-reveal:right="{ delay: 140 }">
          <div class="smo-image-container">
            <img src="/images/smo-celulas.jpg" alt="Visualização microscópica de células com Sistema DIPLE">
          </div>

          <div style="background: white; padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <h4 style="color: var(--primary);">O Sistema DIPLE</h4>
            <p style="font-size: 0.9rem;">Nossa infraestrutura mais poderosa.</p>
            <ul style="font-size: 0.9rem; margin-top: 0.5rem; list-style: disc; padding-left: 1.2rem; color: var(--muted-foreground);">
              <li>Resolução óptica real de até 0,75 µm.</li>
              <li>Campo claro, campo escuro e luz polarizada.</li>
              <li>Limite da luz visível.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Autoridade Docente</span>
        <h2 class="section-title">O que dizem os Professores</h2>
      </div>
      <div class="testimonial-grid">
        <div class="testimonial-card" v-reveal="{ delay: 0 }">
          <p>
            "O DIPLE é uma ferramenta incrível. Mesmo sem experiência prévia, vi um envolvimento total
            dos alunos. Até os estudantes mais 'difíceis' tornaram-se investigadores focados."
          </p>
          <span class="testimonial-author">— Professor de Ensino Médio</span>
        </div>
        <div class="testimonial-card" v-reveal="{ delay: 120 }">
          <p>
            "Usamos a câmera do tablet como uma estação de vídeo externa. As ferramentas são fáceis de
            usar e os participantes viram tudo com clareza, mesmo à distância."
          </p>
          <span class="testimonial-author">— Professor de Ensino Fundamental</span>
        </div>
        <div class="testimonial-card" v-reveal="{ delay: 240 }">
          <p>
            "Um sucesso! Estudantes viram impressões de células vegetais pela primeira vez. Os
            professores estão entusiasmados para levar esses microscópios para suas salas."
          </p>
          <span class="testimonial-author">— Professor Universitário, Oregon State Univ.</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-soft">
    <div class="container">
      <div class="about-section">
        <div class="about-content" v-reveal:left>
          <span class="section-label">Governança Digital</span>
          <h2>Lei 15.100/2025 e BNCC</h2>
          <p>
            O Sistema Ø-1™ estabelece uso dirigido, supervisionado e finalístico do smartphone no
            ambiente escolar.
          </p>
          <ul class="app-list">
            <li>Pensamento Científico (CG 02)</li>
            <li>Cultura Digital (CG 05)</li>
            <li>Argumentação (CG 07)</li>
          </ul>
        </div>
        <div style="background: white; padding: 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" v-reveal:right="{ delay: 140 }">
          <h3 style="color: var(--primary);">Por que adotar a Catalucca?</h3>
          <ul class="app-list">
            <li><strong>Acessibilidade:</strong> Redução drástica de custos vs. laboratórios fixos.</li>
            <li><strong>Mobilidade:</strong> Ciência que cabe em uma maleta.</li>
            <li><strong>Simbiose:</strong> Valorização dos dispositivos da escola.</li>
            <li><strong>Ecossistema:</strong> Workshops e experiências prontas.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section research-section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Ensino Superior</span>
        <h2 class="section-title">Pesquisa e Inovação <span class="research-tag">RUO</span></h2>
        <p class="section-subtitle">
          Classificação <strong>Research Use Only</strong>: infraestrutura dedicada à investigação
          científica avançada, com cadeia de custódia matemática e dados auditáveis para publicação.
        </p>
      </div>

      <div class="research-grid">
        <article class="research-card" v-reveal="{ delay: 0 }">
          <span class="research-card-num">01</span>
          <span class="research-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 2v7.5L4 21h16L14 9.5V2" />
              <path d="M9 2h6" />
              <path d="M7 16h10" />
            </svg>
          </span>
          <h3>Iniciação Científica</h3>
          <p>PIBIC, monografias e TCCs com imagens georreferenciadas e dados rastreáveis para banca avaliadora.</p>
          <ul class="research-card-list">
            <li>Cadeia de custódia digital por captura</li>
            <li>Suporte a metodologias investigativas</li>
            <li>Padrão de coleta replicável</li>
          </ul>
        </article>

        <article class="research-card" v-reveal="{ delay: 120 }">
          <span class="research-card-num">02</span>
          <span class="research-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </span>
          <h3>Stricto Sensu</h3>
          <p>Mestrado e doutorado com infraestrutura compatível com publicações <em>peer-reviewed</em> e rastreabilidade integral do método.</p>
          <ul class="research-card-list">
            <li>Resolução óptica certificada (0,7 µm)</li>
            <li>Stacking não-destrutivo + hashes verificáveis</li>
            <li>Histórico de parâmetros por captura</li>
          </ul>
        </article>

        <article class="research-card" v-reveal="{ delay: 240 }">
          <span class="research-card-num">03</span>
          <span class="research-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
          <h3>Extensão &amp; Ciência Cidadã</h3>
          <p>Projetos comunitários e pesquisa distribuída com instrumentação compartilhada e sincronização ao Hub ATLAS.</p>
          <ul class="research-card-list">
            <li>Operação offline-first em campo</li>
            <li>Padronização entre múltiplas equipes</li>
            <li>Dados abertos e auditáveis</li>
          </ul>
        </article>
      </div>

      <div class="research-callout" v-reveal:scale="{ delay: 200 }">
        <div class="research-callout-side">
          <span class="research-callout-tag">Diferencial RUO</span>
          <h3>Independência analítica para o pesquisador</h3>
        </div>
        <div class="research-callout-body">
          <p>
            Equipamento classificado como <strong>Research Use Only</strong>. Fomento à iniciação
            científica de alta performance, geração de dados auditáveis para publicações e
            autonomia em relação a laboratórios centralizados.
          </p>
        </div>
      </div>
    </div>
  </section>

  <PricingMatrix highlight="educacao" />
  </div>
  <!-- /.hero-overlay-stack -->
</template>
