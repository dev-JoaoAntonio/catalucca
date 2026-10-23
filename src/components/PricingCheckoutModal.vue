<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  plan: { type: Object, default: null },
});

const emit = defineEmits(['close']);

const form = ref({ name: '', email: '', cpfCnpj: '', mobilePhone: '' });
const loading = ref(false);
const error = ref('');

watch(() => props.open, (now) => {
  if (now) {
    error.value = '';
    loading.value = false;
  }
});

async function submit() {
  if (!props.plan) return;
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planKey: props.plan.key,
        name: form.value.name.trim(),
        email: form.value.email.trim(),
        cpfCnpj: form.value.cpfCnpj.trim(),
        mobilePhone: form.value.mobilePhone.trim(),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Erro ${res.status}`);
    if (!data.invoiceUrl) throw new Error('URL de pagamento não recebida.');
    window.location.href = data.invoiceUrl;
  } catch (err) {
    error.value = err.message || 'Não foi possível processar agora. Tente novamente.';
    loading.value = false;
  }
}

function onBackdrop(e) {
  if (e.target === e.currentTarget && !loading.value) emit('close');
}

function formatBRL(v) {
  return Number(v || 0).toLocaleString('pt-BR');
}
</script>

<template>
  <Teleport to="body">
    <Transition name="checkout-fade">
      <div v-if="open" class="checkout-backdrop" @click="onBackdrop">
        <div class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <button
            type="button"
            class="checkout-close"
            @click="emit('close')"
            :disabled="loading"
            aria-label="Fechar"
          >&times;</button>

          <header class="checkout-header">
            <span class="checkout-eyebrow">Contratação HaaS</span>
            <h3 id="checkout-title">{{ plan?.segmentLabel || 'Plano' }}</h3>
            <p class="checkout-plan-line">
              {{ plan?.label || '' }}
              <strong>R$ {{ formatBRL(plan?.value) }}<small>/mês</small></strong>
            </p>
          </header>

          <form class="checkout-form" @submit.prevent="submit" novalidate>
            <label class="checkout-field">
              <span>Nome completo / Razão social</span>
              <input v-model="form.name" type="text" required autocomplete="name">
            </label>

            <label class="checkout-field">
              <span>E-mail</span>
              <input v-model="form.email" type="email" required autocomplete="email">
            </label>

            <label class="checkout-field">
              <span>CPF / CNPJ</span>
              <input v-model="form.cpfCnpj" type="text" required inputmode="numeric" autocomplete="off">
            </label>

            <label class="checkout-field">
              <span>WhatsApp (com DDD)</span>
              <input v-model="form.mobilePhone" type="tel" inputmode="tel" autocomplete="tel">
            </label>

            <p v-if="error" class="checkout-error" role="alert">{{ error }}</p>

            <button type="submit" class="btn btn--primary checkout-submit" :disabled="loading">
              {{ loading ? 'Gerando cobrança…' : 'Avançar para pagamento' }}
            </button>

            <p class="checkout-fineprint">
              Após confirmar, você será redirecionado para finalizar o pagamento via
              <strong>Pix, cartão ou boleto</strong>. Setup técnico único de R$&nbsp;499 cobrado
              separadamente na primeira fatura.
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Componente ainda não usado pela landing (checkout direto via /api/checkout). */
.checkout-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgb(6 27 48 / 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.checkout-modal {
  position: relative;
  width: 100%;
  max-width: 460px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  padding: 2rem 1.75rem 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--bg);
  box-shadow: var(--shadow);
}

.checkout-close {
  position: absolute;
  top: 0.75rem;
  right: 0.85rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--muted);
  transition: color 0.2s ease;
}

.checkout-close:hover {
  color: var(--primary);
}

.checkout-close:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.checkout-header {
  margin-bottom: 1.5rem;
}

.checkout-eyebrow {
  display: inline-block;
  margin-bottom: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.checkout-header h3 {
  margin-bottom: 0.35rem;
  font-size: 1.5rem;
  color: var(--ink);
}

.checkout-plan-line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: var(--muted);
}

.checkout-plan-line strong {
  font-size: 1rem;
  color: var(--primary);
}

.checkout-plan-line small {
  font-size: 0.72em;
  font-weight: 500;
  color: var(--muted);
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.checkout-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.checkout-field span {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink);
}

.checkout-field input {
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--bg);
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.checkout-field input:focus {
  outline: none;
  border-color: var(--accent);
}

.checkout-error {
  padding: 0.6rem 0.8rem;
  border: 1px solid rgb(220 38 38 / 0.3);
  border-radius: var(--radius-sm);
  background: rgb(220 38 38 / 0.08);
  font-size: 0.85rem;
  line-height: 1.4;
  color: #b91c1c;
}

.checkout-submit {
  width: 100%;
  margin-top: 0.4rem;
}

.checkout-fineprint {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--muted);
}

.checkout-fade-enter-active,
.checkout-fade-leave-active {
  transition: opacity 0.25s ease;
}

.checkout-fade-enter-from,
.checkout-fade-leave-to {
  opacity: 0;
}

.checkout-fade-enter-active .checkout-modal,
.checkout-fade-leave-active .checkout-modal {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.checkout-fade-enter-from .checkout-modal,
.checkout-fade-leave-to .checkout-modal {
  transform: translateY(20px) scale(0.97);
}
</style>
