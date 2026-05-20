<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

const verticais = [
  { to: '/educacao', label: 'Educação' },
  { to: '/operacional-privado', label: 'Operacional Privado' },
  { to: '/governo', label: 'Governo' },
];

const companhia = [
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/contato', label: 'Contato' },
  { to: '/', label: 'Home' },
];

const enderecos = [
  { city: 'Brasília / DF', detail: 'Setor de Autarquias Sul', role: 'HUB' },
  { city: 'Itajaí / SC', detail: 'Rodovia Jorge Lacerda', role: 'Polo Logístico' },
];
</script>

<template>
  <footer class="footer-v2" id="contato">
    <div class="footer-v2-grid-deco" aria-hidden="true"></div>

    <div class="container footer-v2-inner">
      <!-- Top: editorial splash -->
      <section class="footer-v2-splash">
        <div class="footer-v2-splash-text">
          <span class="footer-v2-eyebrow">Infraestrutura Científica de Borda</span>
          <h2 class="footer-v2-mark">
            <span class="footer-v2-mark-it">Catalucca</span><span class="footer-v2-mark-dot">.</span>
          </h2>
          <p class="footer-v2-tagline">
            Levamos a triagem técnica para onde a decisão precisa ser tomada — campo, sala de aula, território.
            <em>Utilidade gera legitimidade.</em>
          </p>
        </div>

        <div class="footer-v2-splash-cta">
          <span class="footer-v2-cta-label">Próximos passos</span>
          <router-link to="/contato" class="footer-v2-cta-link">
            <span>Conversar com nosso time</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </router-link>
          <a
            href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20conhecer%20a%20Catalucca."
            target="_blank"
            rel="noopener"
            class="footer-v2-cta-secondary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </section>

      <!-- Middle: navigation columns -->
      <section class="footer-v2-grid">
        <div class="footer-v2-col footer-v2-col-brand">
          <span class="footer-v2-col-heading">Identidade</span>
          <p class="footer-v2-brand-line">
            CATALUCCA Tecnologias é uma integradora nacional de infraestrutura científica aplicada.
            Distribuição exclusiva SMO &amp; IIT na América do Sul.
          </p>
          <ul class="footer-v2-meta">
            <li>
              <span class="footer-v2-meta-key">CNPJ</span>
              <span class="footer-v2-meta-val">61.810.236/0001-88</span>
            </li>
            <li>
              <span class="footer-v2-meta-key">Conformidade</span>
              <span class="footer-v2-meta-val">Lei 9.610/98 &middot; CUP (Paris)</span>
            </li>
            <li>
              <span class="footer-v2-meta-key">Operação</span>
              <span class="footer-v2-meta-val">Offline-first &middot; Hub ATLAS</span>
            </li>
          </ul>
        </div>

        <div class="footer-v2-col">
          <span class="footer-v2-col-heading">Verticais</span>
          <ul class="footer-v2-list">
            <li v-for="item in verticais" :key="item.to">
              <router-link :to="item.to" class="footer-v2-link">
                <span class="footer-v2-link-arrow" aria-hidden="true">↗</span>
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-v2-col">
          <span class="footer-v2-col-heading">Companhia</span>
          <ul class="footer-v2-list">
            <li v-for="item in companhia" :key="item.to">
              <router-link :to="item.to" class="footer-v2-link">
                <span class="footer-v2-link-arrow" aria-hidden="true">↗</span>
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-v2-col">
          <span class="footer-v2-col-heading">Contato direto</span>
          <ul class="footer-v2-list footer-v2-list-contact">
            <li>
              <a href="mailto:suporte@catalucca.com.br" class="footer-v2-link">
                <span class="footer-v2-link-arrow" aria-hidden="true">↗</span>
                <span>suporte@catalucca.com.br</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/5547999455080" target="_blank" rel="noopener" class="footer-v2-link">
                <span class="footer-v2-link-arrow" aria-hidden="true">↗</span>
                <span>+55 47 99945-5080</span>
              </a>
            </li>
          </ul>

          <div class="footer-v2-addresses">
            <div v-for="loc in enderecos" :key="loc.city" class="footer-v2-address">
              <span class="footer-v2-address-role">{{ loc.role }}</span>
              <strong class="footer-v2-address-city">{{ loc.city }}</strong>
              <span class="footer-v2-address-detail">{{ loc.detail }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom: legal -->
      <section class="footer-v2-bottom">
        <p class="footer-v2-copyright">
          <span>©&nbsp;{{ currentYear }}</span>
          <span class="footer-v2-bottom-dot" aria-hidden="true">·</span>
          <span>CATALUCCA Tecnologias</span>
          <span class="footer-v2-bottom-dot" aria-hidden="true">·</span>
          <em>Todos os direitos reservados.</em>
        </p>

        <p class="footer-v2-credits">
          <span>Borda &mdash; território &mdash; evidência.</span>
        </p>
      </section>
    </div>
  </footer>
</template>
