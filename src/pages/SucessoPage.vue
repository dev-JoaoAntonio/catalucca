<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

useHead({
  title: 'Pagamento confirmado — CATALUCCA',
  meta: [{ name: 'robots', content: 'noindex' }],
});

const route = useRoute();

const planKey = computed(() => String(route.query.plan || ''));
</script>

<template>
  <section class="section sucesso-section">
    <div class="container sucesso-container">
      <div class="sucesso-card" v-reveal:scale>
        <div class="sucesso-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>

        <span class="sucesso-eyebrow">Contratação confirmada</span>
        <h1 class="sucesso-title">Recebemos seu pedido.</h1>

        <p class="sucesso-body">
          A equipe Catalucca foi notificada e em até <strong>1 dia útil</strong> entraremos em
          contato no e-mail e WhatsApp informados para iniciar o onboarding técnico, calibração e
          ativação no Hub ATLAS.
        </p>

        <p v-if="planKey" class="sucesso-meta">
          Referência interna: <code>{{ planKey }}</code>
        </p>

        <div class="sucesso-actions">
          <router-link to="/" class="btn">Voltar pra home</router-link>
          <a
            href="https://wa.me/5547999455080?text=Olá,%20acabei%20de%20contratar%20o%20HaaS%20Catalucca%20e%20gostaria%20de%20agilizar%20o%20onboarding."
            target="_blank"
            rel="noopener"
            class="btn btn-outline"
          >Adiantar onboarding pelo WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
</template>
