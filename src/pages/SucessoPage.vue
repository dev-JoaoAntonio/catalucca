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
        <h1 class="title sucesso__title" v-split>Recebemos o seu <em>pedido</em>.</h1>

        <p class="lead sucesso__body">
          A equipe Catalucca foi notificada e, em até <strong>um dia útil</strong>, entraremos em
          contato pelo e-mail e pelo WhatsApp informados para iniciar o onboarding técnico, a
          calibração e a ativação no Hub ATLAS.
        </p>

        <p v-if="planKey" class="sucesso__meta">
          Referência interna: <code>{{ planKey }}</code>
        </p>

        <div class="sucesso__actions">
          <router-link to="/" class="btn btn--primary btn--arrow">Voltar para a página inicial</router-link>
          <a :href="onboardingLink" target="_blank" rel="noopener" class="link-cta">
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
}

.sucesso__card {
  max-width: 680px;
  margin-inline: auto;
  padding: clamp(2rem, 6vw, 4rem);
  border: 1px solid var(--ink);
  border-radius: var(--radius-sm);
  background: var(--bg);
  text-align: center;
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
  align-items: center;
  justify-content: center;
  gap: 1rem 1.75rem;
  margin-top: 2rem;
}
</style>
