<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { whatsappLink } from '@/data/contact';

useHead({
  title: 'Pagamento confirmado | CATALUCCA',
  meta: [{ name: 'robots', content: 'noindex' }],
});

const route = useRoute();

const planKey = computed(() => String(route.query.plan || ''));
const onboardingLink = whatsappLink(
  'Olá! Acabei de contratar o HaaS da Catalucca e gostaria de agilizar o onboarding.'
);
</script>

<template>
  <section class="section sucesso">
    <div class="container">
      <div class="sucesso__card" v-reveal:scale>
        <div class="sucesso__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <p class="eyebrow">Contratação confirmada</p>
        <h1 class="title sucesso__title">Recebemos o seu pedido.</h1>

        <p class="lead sucesso__body">
          A equipe Catalucca foi notificada e, em até <strong>um dia útil</strong>, entraremos em
          contato pelo e-mail e pelo WhatsApp informados para iniciar o onboarding técnico, a
          calibração e a ativação no Hub ATLAS.
        </p>

        <p v-if="planKey" class="sucesso__meta">
          Referência interna: <code>{{ planKey }}</code>
        </p>

        <div class="sucesso__actions">
          <router-link to="/" class="btn btn--primary">Voltar para a página inicial</router-link>
          <a :href="onboardingLink" target="_blank" rel="noopener" class="btn btn--ghost">
            Adiantar o onboarding pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sucesso {
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding-top: calc(var(--header-h) + var(--section-y));
  background: var(--bg-soft);
}

.sucesso__card {
  max-width: 680px;
  margin-inline: auto;
  padding: clamp(2rem, 6vw, 4rem);
  border-radius: var(--radius-lg);
  background: var(--bg);
  box-shadow: var(--shadow);
  text-align: center;
}

.sucesso__icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
}

.sucesso__icon svg {
  width: 32px;
  height: 32px;
}

.sucesso__title {
  margin: 1rem 0 1.25rem;
}

.sucesso__meta {
  margin-top: 1.25rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.sucesso__meta code {
  font-family: var(--font-mono);
  color: var(--ink);
}

.sucesso__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}
</style>
