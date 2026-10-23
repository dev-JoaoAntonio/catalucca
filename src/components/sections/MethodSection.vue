<script setup>
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { whatsappLink } from '@/data/contact';

const expertLink = whatsappLink('Olá! Gostaria de entender a arquitetura da Catalucca com um especialista.');

const nodes = [
  {
    tag: 'Borda',
    title: 'Dispositivo BYOD',
    text: 'O smartphone do operador vira um microscópio óptico calibrado em campo.',
  },
  {
    tag: 'Campo',
    title: 'Captura blindada',
    text: 'Parâmetros travados, hash gerado localmente e operação 100% offline.',
  },
  {
    tag: 'NOC',
    title: 'Hub ATLAS',
    text: 'Sincronização, governança, Atlas de Microscopia de Borda e custódia perene.',
  },
];
</script>

<template>
  <section id="metodo" class="section method" data-spy="metodo">
    <div class="container">
      <SectionIntro>
        <template #title>Dinâmica de <em>resposta imediata</em>.</template>
        A transição do vazio de informação para a evidência científica.
      </SectionIntro>

      <div class="method__points" v-progress="'read'">
        <article class="method__point" v-reveal>
          <div class="method__glyph-row" aria-hidden="true">
            <span class="method__glyph">Ø</span>
            <span class="method__link">
              <span class="method__line"></span>
              <span class="method__arrow">→</span>
            </span>
          </div>
          <h3>Ponto zero</h3>
          <p>O momento da incerteza: o problema ocorre, mas falta informação técnica para decidir.</p>
        </article>

        <article class="method__point method__point--one" v-reveal="{ delay: 150 }">
          <div class="method__glyph-row" aria-hidden="true">
            <span class="method__glyph">1</span>
          </div>
          <h3>Ponto um</h3>
          <p>
            Evidência documentada, com cadeia de custódia, timestamp e GPS registrados no exato
            momento da observação.
          </p>
        </article>
      </div>

      <div class="arch">
        <div class="arch__intro">
          <h3 class="arch__title" v-reveal>
            BYOD + NOC: ciência de borda conectada.
          </h3>
          <p v-reveal="{ delay: 160 }">
            O ecossistema Catalucca opera em uma arquitetura descentralizada, que integra o modelo
            BYOD (<em>Bring Your Own Device</em>) a um NOC central. Dispositivos móveis comuns se
            transformam em <strong>laboratórios submicrométricos de 0,7&nbsp;µm</strong>, sob a
            doutrina global da Ciência de Borda Conectada (<em>Connected Edge Science</em>).
          </p>
          <a :href="expertLink" target="_blank" rel="noopener" class="link-cta arch__cta" v-reveal="{ delay: 220 }">
            Falar com um especialista técnico
          </a>
        </div>

        <ol class="arch__flow" v-progress="'read'">
          <li
            v-for="(node, i) in nodes"
            :key="node.title"
            class="arch__node"
            :style="{ '--k': i }"
            v-reveal="{ delay: i * 120 }"
          >
            <div class="arch__marker">
              <span class="arch__num mono">0{{ i + 1 }}</span>
              <span v-if="i < nodes.length - 1" class="arch__connector" aria-hidden="true"></span>
            </div>
            <h4>{{ node.title }} <span class="arch__tag">· {{ node.tag }}</span></h4>
            <p>{{ node.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ø → 1 */
.method__points {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.5rem clamp(2rem, 5vw, 4rem);
  margin-top: clamp(3rem, 6vw, 5rem);
}

.method__glyph-row {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
}

.method__glyph {
  font-family: var(--font-display);
  font-size: clamp(6.5rem, 14vw, 12rem);
  font-weight: 200;
  line-height: 0.85;
  letter-spacing: -0.06em;
  color: var(--line-strong);
}

.method__point--one .method__glyph {
  color: var(--ink);
}

.method__point h3 {
  margin-bottom: 0.6rem;
  font-size: 1.25rem;
}

.method__point p {
  max-width: 38ch;
  color: var(--muted);
}

/* Linha que liga o Ø ao 1 e se desenha com a rolagem. */
.method__link {
  display: flex;
  flex: 1;
  align-items: center;
  color: var(--ink);
}

.method__line {
  flex: 1;
  height: 1px;
  background: var(--ink);
  transform: scaleX(var(--p, 1));
  transform-origin: left;
}

.method__arrow {
  margin-left: -0.35rem;
  font-size: 1.25rem;
  line-height: 1;
  opacity: clamp(0, calc(var(--p, 1) * 4 - 3), 1);
}

/* Arquitetura */
.arch {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  margin-top: clamp(5rem, 10vw, 8rem);
  padding-top: clamp(3rem, 6vw, 5rem);
  border-top: 1px solid var(--line);
}

.arch__title {
  margin: 0 0 1.25rem;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 2.8vw, 2.375rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.arch__intro p {
  color: var(--text);
}

.arch__cta {
  margin-top: 1.75rem;
}

.arch__flow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.arch__marker {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.arch__num {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--ink);
  border-radius: var(--radius-sm);
  background: var(--bg);
  font-size: 0.8125rem;
  color: var(--ink);
}

.arch__node:last-child .arch__num {
  background: var(--ink);
  color: #fff;
}

/* Conector que se desenha entre um nó e o próximo. */
.arch__connector {
  position: absolute;
  top: 50%;
  left: 48px;
  width: calc(100% - 48px + 1.5rem);
  height: 1px;
  background: var(--line-strong);
  overflow: hidden;
}

.arch__connector::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--ink);
  transform: scaleX(clamp(0, calc(var(--p, 1) * 2.4 - var(--k) * 1.1), 1));
  transform-origin: left;
}

.arch__tag {
  font-size: 0.9375rem;
  color: var(--muted);
  font-weight: 400;
}

.arch__node h4 {
  margin: 0 0 0.5rem;
  font-size: 1.0625rem;
}

.arch__node p {
  font-size: 0.9375rem;
  color: var(--muted);
}

@media (max-width: 1000px) {
  .arch {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .method__points {
    grid-template-columns: 1fr;
  }

  .method__link {
    display: none;
  }

  .arch__flow {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .arch__node {
    display: grid;
    grid-template-columns: 48px 1fr;
    column-gap: 1.25rem;
  }

  .arch__marker {
    grid-row: span 3;
    align-items: flex-start;
    margin-bottom: 0;
  }

  .arch__connector {
    top: 48px;
    left: 24px;
    width: 1px;
    height: calc(100% + 2rem - 48px);
  }

  .arch__connector::after {
    transform: scaleY(clamp(0, calc(var(--p, 1) * 2.4 - var(--k) * 1.1), 1));
    transform-origin: top;
  }
}
</style>
