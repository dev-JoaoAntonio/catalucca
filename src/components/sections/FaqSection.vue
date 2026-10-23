<script setup>
import { ref } from 'vue';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
import { FAQ } from '@/data/faq';
import { whatsappLink } from '@/data/contact';

const openIdx = ref(0);
const waLink = whatsappLink('Olá! Tenho uma dúvida sobre a Catalucca.');

function toggle(i) {
  openIdx.value = openIdx.value === i ? -1 : i;
}
</script>

<template>
  <section id="faq" class="section faq" data-spy="faq">
    <div class="container faq__grid">
      <div class="faq__aside">
        <SectionIntro index="09" label="FAQ">
          <template #title>Perguntas frequentes.</template>
          Não encontrou o que procurava? Nossa equipe técnica responde em até um dia útil.
        </SectionIntro>
        <a :href="waLink" target="_blank" rel="noopener" class="btn btn--ghost faq__cta" v-reveal="{ delay: 240 }">
          Tirar dúvidas no WhatsApp
          <AppIcon name="arrow-right" />
        </a>
      </div>

      <div class="faq__list">
        <div
          v-for="(item, i) in FAQ"
          :key="item.q"
          class="faq__item"
          :class="{ 'is-open': openIdx === i }"
          v-reveal="{ delay: i * 60 }"
        >
          <h3>
            <button
              :id="`faq-q-${i}`"
              type="button"
              class="faq__question"
              :aria-expanded="openIdx === i ? 'true' : 'false'"
              :aria-controls="`faq-a-${i}`"
              @click="toggle(i)"
            >
              {{ item.q }}
              <span class="faq__icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div :id="`faq-a-${i}`" class="faq__answer" role="region" :aria-labelledby="`faq-q-${i}`">
            <div>
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(2rem, 6vw, 6rem);
}

.faq__aside {
  position: sticky;
  top: calc(var(--header-h) + 2rem);
  align-self: start;
}

.faq__cta {
  margin-top: 2rem;
}

.faq__list {
  border-top: 1px solid var(--line);
}

.faq__item {
  border-bottom: 1px solid var(--line);
}

.faq__item h3 {
  font-size: inherit;
}

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  padding: 1.5rem 0;
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
  font-weight: 500;
  letter-spacing: -0.015em;
  text-align: left;
  color: var(--ink);
  transition: color 0.3s var(--ease);
}

.faq__question:hover {
  color: var(--accent);
}

/* Sinal de + que vira − ao abrir. */
.faq__icon {
  position: relative;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  transition:
    background-color 0.4s var(--ease),
    border-color 0.4s var(--ease);
}

.faq__icon::before,
.faq__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 1.5px;
  margin: -0.75px 0 0 -6px;
  background: currentColor;
  transition: transform 0.4s var(--ease);
}

.faq__icon::after {
  transform: rotate(90deg);
}

.is-open .faq__icon {
  border-color: var(--primary);
  background: var(--primary);
  color: #fff;
}

.is-open .faq__icon::after {
  transform: rotate(0deg);
}

.faq__answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s var(--ease);
}

.faq__answer > div {
  overflow: hidden;
  visibility: hidden;
  transition: visibility 0s linear 0.5s;
}

.is-open .faq__answer {
  grid-template-rows: 1fr;
}

.is-open .faq__answer > div {
  visibility: visible;
  transition-delay: 0s;
}

.faq__answer p {
  max-width: 60ch;
  padding-bottom: 1.5rem;
  color: var(--text);
}

@media (max-width: 900px) {
  .faq__grid {
    grid-template-columns: 1fr;
  }

  .faq__aside {
    position: static;
  }
}
</style>
