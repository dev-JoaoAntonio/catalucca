<script setup>
import { ref, computed } from 'vue';
import { useHead } from '@unhead/vue';

const PAGE_DESC =
  'Demonstrações técnicas, propostas HaaS e suporte para projetos de educação, operação privada e governo. Resposta em até 1 dia útil.';

useHead({
  title: 'Contato | CATALUCCA',
  meta: [
    { name: 'description', content: PAGE_DESC },
    { property: 'og:title', content: 'Contato | CATALUCCA' },
    { property: 'og:description', content: PAGE_DESC },
    { property: 'og:url', content: 'https://www.catalucca.com.br/contato' },
    { property: 'og:image', content: 'https://www.catalucca.com.br/images/logo-tab.jpg' },
    { name: 'twitter:title', content: 'Contato | CATALUCCA' },
    { name: 'twitter:description', content: PAGE_DESC },
    { name: 'twitter:image', content: 'https://www.catalucca.com.br/images/logo-tab.jpg' },
  ],
  link: [{ rel: 'canonical', href: 'https://www.catalucca.com.br/contato' }],
});

const form = ref({
  name: '',
  email: '',
  organization: '',
  segment: '',
  message: '',
});

const segments = [
  { value: 'educacao', label: 'Educação' },
  { value: 'operacional-privado', label: 'Operacional Privado' },
  { value: 'governo', label: 'Governo & Defesa' },
  { value: 'outro', label: 'Outro' },
];

const mailtoHref = computed(() => {
  const subject = `Contato Catalucca — ${form.value.segment || 'consulta'}`;
  const body = [
    `Nome: ${form.value.name}`,
    `Email: ${form.value.email}`,
    `Organização: ${form.value.organization}`,
    `Segmento: ${form.value.segment}`,
    '',
    'Mensagem:',
    form.value.message,
  ].join('\n');
  return `mailto:suporte@catalucca.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

function onSubmit(event) {
  event.preventDefault();
  window.location.href = mailtoHref.value;
}
</script>

<template>
  <section class="hero hero-grid">
    <div class="container">
      <div class="hero-content">
        <span class="section-label" style="justify-content: center; display: flex; color: #4FC3F7;" v-reveal>
          Conexão Direta
        </span>
        <h1 class="hero-title" style="color: white;" v-reveal="{ delay: 120 }">Fale com a equipe Catalucca.</h1>
        <p class="hero-subtitle" style="color: rgba(255,255,255,0.9);" v-reveal="{ delay: 240 }">
          Demonstrações técnicas, propostas HaaS e suporte para projetos de educação, operação privada e
          governo. Resposta em até 1 dia útil.
        </p>
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
      <div class="contact-grid">
        <aside class="contact-channels">
          <div class="contact-channel" v-reveal:left>
            <div class="contact-channel-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <h3>E-mail técnico</h3>
              <a href="mailto:suporte@catalucca.com.br">suporte@catalucca.com.br</a>
              <p>Para propostas, RFQ e dúvidas comerciais.</p>
            </div>
          </div>

          <div class="contact-channel" v-reveal:left="{ delay: 120 }">
            <div class="contact-channel-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <h3>WhatsApp</h3>
              <a href="https://wa.me/5547999455080" target="_blank" rel="noopener">+55 47 99945-5080</a>
              <p>Resposta direta de seg a sex, 9h–18h (BRT).</p>
            </div>
          </div>

          <div class="contact-channel" v-reveal:left="{ delay: 240 }">
            <div class="contact-channel-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3>Endereços</h3>
              <p><strong>HUB Brasília/DF</strong><br>Setor de Autarquias Sul</p>
              <p><strong>Polo Logístico Itajaí/SC</strong><br>Rodovia Jorge Lacerda</p>
            </div>
          </div>
        </aside>

        <form class="contact-form" @submit="onSubmit" novalidate v-reveal:right="{ delay: 200 }">
          <div class="contact-form-header">
            <span class="section-label">Solicitar contato</span>
            <h2>Envie sua demanda</h2>
            <p>Preencha o formulário abaixo. Ele abrirá o seu e-mail com a mensagem pronta.</p>
          </div>

          <div class="contact-form-row">
            <label class="contact-field">
              <span>Nome</span>
              <input v-model="form.name" type="text" required autocomplete="name" />
            </label>
            <label class="contact-field">
              <span>E-mail</span>
              <input v-model="form.email" type="email" required autocomplete="email" />
            </label>
          </div>

          <div class="contact-form-row">
            <label class="contact-field">
              <span>Organização</span>
              <input v-model="form.organization" type="text" autocomplete="organization" />
            </label>
            <label class="contact-field">
              <span>Segmento</span>
              <select v-model="form.segment" required>
                <option value="" disabled>Selecione…</option>
                <option v-for="s in segments" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>
            </label>
          </div>

          <label class="contact-field">
            <span>Mensagem</span>
            <textarea v-model="form.message" rows="6" required placeholder="Conte sobre seu cenário, escala, prazos e necessidades técnicas."></textarea>
          </label>

          <div class="contact-form-actions">
            <button type="submit" class="btn">Enviar mensagem</button>
            <a
              href="https://wa.me/5547999455080?text=Olá,%20gostaria%20de%20uma%20proposta%20HaaS%20da%20Catalucca."
              target="_blank"
              rel="noopener"
              class="btn btn-outline"
            >Continuar no WhatsApp</a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
