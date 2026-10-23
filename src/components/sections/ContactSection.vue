<script setup>
import { ref, reactive } from 'vue';
import { ADDRESSES, EMAIL, PHONE_DISPLAY, whatsappLink } from '@/data/contact';

const segments = [
  { value: 'educacao', label: 'Educação' },
  { value: 'operacional-privado', label: 'Operacional privado' },
  { value: 'governo', label: 'Governo e defesa' },
  { value: 'outro', label: 'Outro' },
];

const form = reactive({ name: '', email: '', organization: '', segment: '', message: '' });
const sent = ref(false);
const waLink = whatsappLink('Olá! Gostaria de uma proposta HaaS da Catalucca.');

// O navegador valida os campos obrigatórios antes de disparar o submit.
function onSubmit() {
  const segment = segments.find((s) => s.value === form.segment)?.label || 'Consulta';
  const subject = `Contato pelo site — ${segment}`;
  const body = [
    `Nome: ${form.name}`,
    `E-mail: ${form.email}`,
    `Organização: ${form.organization || '—'}`,
    `Segmento: ${segment}`,
    '',
    'Mensagem:',
    form.message,
  ].join('\n');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  sent.value = true;
}
</script>

<template>
  <section id="contato" class="section contact" data-spy="contato">
    <div class="container contact__grid">
      <div class="contact__intro">
        <h2 class="title" v-reveal>
          Pronto para implantar a Catalucca <em>na sua operação</em>?
        </h2>
        <p class="lead contact__lead" v-reveal="{ delay: 100 }">
          Demonstrações técnicas, propostas HaaS e suporte para projetos de educação, operação
          privada e governo. <strong>Resposta em até um dia útil.</strong>
        </p>

        <ul class="channels">
          <li v-reveal="{ delay: 200 }">
            <div>
              <h3>E-mail técnico</h3>
              <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
              <p>Propostas, RFQ e dúvidas comerciais.</p>
            </div>
          </li>
          <li v-reveal="{ delay: 280 }">
            <div>
              <h3>WhatsApp</h3>
              <a :href="whatsappLink()" target="_blank" rel="noopener">{{ PHONE_DISPLAY }}</a>
              <p>De segunda a sexta, das 9h às 18h (horário de Brasília).</p>
            </div>
          </li>
          <li v-reveal="{ delay: 360 }">
            <div>
              <h3>Endereços</h3>
              <p v-for="loc in ADDRESSES" :key="loc.city">
                <strong>{{ loc.role }} {{ loc.city }}</strong> · {{ loc.detail }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <form class="contact__form" @submit.prevent="onSubmit" v-reveal:right="{ delay: 150 }">
        <h3>Envie sua demanda</h3>
        <p class="contact__form-hint">
          Ao enviar, o seu aplicativo de e-mail abre com a mensagem pronta.
        </p>

        <div class="contact__row">
          <label class="field">
            <span>Nome</span>
            <input v-model="form.name" type="text" required autocomplete="name">
          </label>
          <label class="field">
            <span>E-mail</span>
            <input v-model="form.email" type="email" required autocomplete="email">
          </label>
        </div>

        <div class="contact__row">
          <label class="field">
            <span>Organização <em>(opcional)</em></span>
            <input v-model="form.organization" type="text" autocomplete="organization">
          </label>
          <label class="field">
            <span>Segmento</span>
            <select v-model="form.segment" required>
              <option value="" disabled>Selecione</option>
              <option v-for="s in segments" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </label>
        </div>

        <label class="field">
          <span>Mensagem</span>
          <textarea
            v-model="form.message"
            rows="5"
            required
            placeholder="Conte sobre o seu cenário, escala, prazos e necessidades técnicas."
          ></textarea>
        </label>

        <div class="contact__actions">
          <button type="submit" class="btn btn--primary btn--arrow">Enviar mensagem</button>
          <a :href="waLink" target="_blank" rel="noopener" class="link-cta">Continuar no WhatsApp</a>
        </div>

        <p v-if="sent" class="contact__sent" role="status">
          Abrimos o seu aplicativo de e-mail. Se nada aconteceu, escreva para
          <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-top: 1px solid var(--line);
}

.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: start;
}

.contact__lead {
  margin-top: 1.25rem;
}

.channels {
  display: grid;
  margin-top: 3rem;
  border-top: 1px solid var(--ink);
}

.channels li {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--line);
}

.channels h3 {
  margin-bottom: 0.35rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--muted);
}

.channels a {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--ink);
  transition: color 0.3s var(--ease);
}

.channels a:hover {
  color: var(--muted);
}

.channels p {
  font-size: 0.9375rem;
  color: var(--muted);
}

/* Formulário */
.contact__form {
  display: grid;
  gap: 1.1rem;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border: 1px solid var(--ink);
  border-radius: var(--radius-sm);
  background: var(--bg);
}

.contact__form h3 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.contact__form-hint {
  margin-top: -0.6rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.contact__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field span {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink);
}

.field em {
  font-style: normal;
  font-weight: 400;
  color: var(--muted);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.8rem 0.95rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--bg);
  font-size: 0.9375rem;
  color: var(--ink);
  transition:
    border-color 0.25s var(--ease),
    box-shadow 0.25s var(--ease);
}

.field textarea {
  resize: vertical;
  min-height: 130px;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--ink);
  box-shadow: 0 0 0 3px rgb(17 20 24 / 0.08);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.75rem;
  margin-top: 0.5rem;
}

.contact__sent {
  padding: 0.85rem 1rem;
  border-left: 1px solid var(--ink);
  background: var(--bg-soft);
  font-size: 0.875rem;
  color: var(--ink);
}

.contact__sent a {
  font-weight: 500;
  color: var(--ink);
  text-decoration: underline;
}

@media (max-width: 960px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .contact__row {
    grid-template-columns: 1fr;
  }
}
</style>
