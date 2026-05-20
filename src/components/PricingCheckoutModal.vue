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

            <button type="submit" class="btn checkout-submit" :disabled="loading">
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
