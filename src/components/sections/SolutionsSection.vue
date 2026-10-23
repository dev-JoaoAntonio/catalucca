<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import EducationBlock from './solutions/EducationBlock.vue';
import OperationsBlock from './solutions/OperationsBlock.vue';
import GovernmentBlock from './solutions/GovernmentBlock.vue';
import { SECTION_EVENT } from '@/composables/useSectionLink';

const fronts = [
  {
    key: 'educacao',
    title: 'Educação',
    text: 'Sistema Ø—1™ para escolas e universidades.',
    component: EducationBlock,
  },
  {
    key: 'operacional',
    title: 'Operacional privado',
    text: 'Inspeção móvel, perícia técnica e laudos.',
    component: OperationsBlock,
  },
  {
    key: 'governo',
    title: 'Governo',
    text: 'Dez programas federais em um sistema.',
    component: GovernmentBlock,
  },
];
const keys = fronts.map((f) => f.key);

// A aba vem da URL: /governo (rota de seção) ou #governo (âncora).
const route = useRoute();
function keyFromRoute() {
  const hash = route.hash.slice(1);
  if (keys.includes(hash)) return hash;
  return keys.includes(route.meta.section) ? route.meta.section : null;
}

const active = ref(keyFromRoute() || keys[0]);
const tabEls = [];

// Só âncoras das próprias abas ou a troca de página mudam a aba; um #haas
// em /educacao não deve reabrir Educação.
watch(
  () => route.hash,
  (hash) => {
    if (keys.includes(hash.slice(1))) active.value = hash.slice(1);
  }
);
watch(
  () => route.path,
  () => {
    if (keys.includes(route.meta.section)) active.value = route.meta.section;
  }
);

// Links do menu e do rodapé que apontam para uma frente já aberta na URL
// não mudam a rota; o evento garante que a aba certa abra mesmo assim.
function onSectionEvent(event) {
  const key = event.detail?.slice(1);
  if (keys.includes(key)) active.value = key;
}

function onTabKeydown(event, i) {
  const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
  if (!step) return;
  event.preventDefault();
  const next = (i + step + keys.length) % keys.length;
  active.value = keys[next];
  tabEls[next]?.focus();
}

onMounted(() => window.addEventListener(SECTION_EVENT, onSectionEvent));
onBeforeUnmount(() => window.removeEventListener(SECTION_EVENT, onSectionEvent));
</script>

<template>
  <section id="solucoes" class="section solutions" data-spy="solucoes">
    <div class="container">
      <SectionIntro>
        <template #title>Uma infraestrutura, <em>três frentes</em> de atuação.</template>
        A mesma base técnica, com posturas distintas, adaptadas ao contexto e à pressão de decisão
        de cada operação.
      </SectionIntro>

      <div class="tabs rail-mobile" role="tablist" aria-label="Frentes de atuação" v-reveal:fade>
        <button
          v-for="(front, i) in fronts"
          :id="front.key"
          :key="front.key"
          :ref="(el) => (tabEls[i] = el)"
          type="button"
          role="tab"
          class="tab"
          :class="{ 'is-active': active === front.key }"
          :aria-selected="active === front.key ? 'true' : 'false'"
          :aria-controls="`painel-${front.key}`"
          :tabindex="active === front.key ? 0 : -1"
          @click="active = front.key"
          @keydown="onTabKeydown($event, i)"
        >
          <span class="tab__num mono">0{{ i + 1 }}</span>
          <span class="tab__title">{{ front.title }}</span>
          <span class="tab__text">{{ front.text }}</span>
        </button>
      </div>

      <div class="panels" v-reveal:fade>
        <div
          v-for="front in fronts"
          v-show="active === front.key"
          :id="`painel-${front.key}`"
          :key="front.key"
          role="tabpanel"
          :aria-labelledby="front.key"
          tabindex="0"
        >
          <component :is="front.component" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  margin-block: clamp(2.5rem, 5vw, 3.5rem);
}

.tab {
  position: relative;
  display: grid;
  gap: 0.35rem;
  padding: 1.5rem 1.5rem 1.5rem 0;
  text-align: left;
  color: var(--muted);
  transition: color 0.35s var(--ease);
}

.tab + .tab {
  padding-left: 1.5rem;
  border-left: 1px solid var(--line);
}

/* Régua superior que se estende na aba ativa. */
.tab::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--ease);
}

.tab:hover,
.tab.is-active {
  color: var(--ink);
}

.tab.is-active::before {
  transform: scaleX(1);
}

.tab__num {
  font-size: 0.75rem;
}

.tab__title {
  font-size: clamp(1.375rem, 2.2vw, 1.75rem);
  font-weight: 500;
  letter-spacing: -0.035em;
}

.tab__text {
  font-size: 0.875rem;
}

.panels:focus-visible,
[role='tabpanel']:focus-visible {
  outline-offset: 8px;
}

@media (max-width: 900px) {
  .tabs {
    grid-auto-columns: max-content !important;
    border-top: 0;
  }

  .tab,
  .tab + .tab {
    padding: 0.85rem 1rem;
    border: 1px solid var(--line);
  }

  .tab::before {
    top: auto;
    bottom: -1px;
  }

  .tab__text {
    display: none;
  }

  .tab__title {
    font-size: 1.125rem;
  }
}
</style>
