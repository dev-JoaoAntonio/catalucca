<script setup>
defineProps({
  slogan: {
    type: String,
    default: 'Infraestrutura Científica de Borda.',
  },
  secondaryContact: {
    type: Object,
    default: () => ({
      label: 'Consultoria Técnica (WhatsApp)',
      href: 'https://wa.me/5547999455080',
      external: true,
      icon: 'whatsapp',
    }),
  },
});
</script>

<template>
  <footer class="footer" id="contato">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <router-link to="/" class="footer-logo-text">CATALUCCA</router-link>
          <p class="footer-slogan">{{ slogan }}</p>
          <div class="footer-address">
            <p><strong>HUB Brasília/DF</strong><br>Setor de Autarquias Sul</p>
            <p><strong>Polo Logístico Itajaí/SC</strong><br>Rodovia Jorge Lacerda</p>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Navegação</h4>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/educacao">Educação &amp; BNCC</router-link></li>
            <li><router-link to="/operacional-privado">Operacional Privado</router-link></li>
            <li><router-link to="/governo">Governo &amp; Defesa</router-link></li>
            <li><router-link to="/contato">Contato</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Conexão</h4>
          <ul class="footer-links">
            <li>
              <a href="mailto:suporte@catalucca.com.br" class="footer-contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                suporte@catalucca.com.br
              </a>
            </li>
            <li>
              <a
                :href="secondaryContact.href"
                :target="secondaryContact.external ? '_blank' : undefined"
                :rel="secondaryContact.external ? 'noopener' : undefined"
                class="footer-contact-link"
                :style="secondaryContact.icon === 'user' ? { color: 'var(--accent)' } : null"
              >
                <svg
                  v-if="secondaryContact.icon === 'whatsapp'"
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <svg
                  v-else-if="secondaryContact.icon === 'user'"
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {{ secondaryContact.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} CATALUCCA Tecnologias. Todos os direitos reservados.</p>
        <p class="legal-note">CNPJ 61.810.236/0001-88 · Proteção: Lei 9.610/98 (Direitos Autorais) e Convenção de Paris (CUP).</p>
      </div>
    </div>
  </footer>
</template>
