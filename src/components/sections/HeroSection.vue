<script setup>
import { useSectionLink } from '@/composables/useSectionLink';
import { whatsappLink } from '@/data/contact';

const go = useSectionLink();
const demoLink = whatsappLink('Olá! Gostaria de solicitar uma demonstração técnica da Catalucca.');
const LINES = ['A precisão do laboratório.', 'A soberania da decisão', 'no território.'];
const title = LINES.join(' ');

// Linhas → palavras → caracteres, com índice global para escalonar a entrada.
let index = 0;
const lines = LINES.map((line) =>
  line.split(' ').map((word) => [...word].map((char) => ({ char, i: index++ })))
);
</script>

<template>
  <section id="inicio" class="hero" data-spy="inicio" v-progress="'leave'">
    <div class="hero__media" aria-hidden="true">
      <video
        class="hero__video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4">
      </video>
      <div class="hero__shade"></div>
    </div>

    <div class="container hero__content">
      <h1 class="hero__title" :aria-label="title">
        <span
          v-for="(line, l) in lines"
          :key="l"
          class="hero__line"
          :class="{ 'hero__line--em': l === 1 }"
          aria-hidden="true"
        >
          <template v-for="(word, w) in line" :key="w">
            <span class="hero__word"><span v-for="c in word" :key="c.i" class="hero__char" :style="{ '--i': c.i }">{{ c.char }}</span></span>{{ w < line.length - 1 ? ' ' : '' }}
          </template>
        </span>
      </h1>

      <div class="hero__bottom">
        <p class="hero__lead">
          Resolução submicrométrica de <strong>0,7&nbsp;µm</strong> direto no smartphone.
          Inteligência microvisual integrada à operação, à qualidade e à gestão estratégica
          de risco.
        </p>
        <div class="hero__actions">
          <a :href="demoLink" target="_blank" rel="noopener" class="btn btn--light btn--arrow">
            Solicitar demonstração
          </a>
          <a href="/#tecnologia" class="btn btn--outline-light" @click.prevent="go('#tecnologia')">
            Conhecer a tecnologia
          </a>
        </div>
      </div>
    </div>

    <a href="/#sobre" class="hero__cue" @click.prevent="go('#sobre')">
      <span>Role para explorar</span>
      <i aria-hidden="true"></i>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  min-height: 100svh;
  padding: calc(var(--header-h) + 3rem) 0 clamp(5.5rem, 11vh, 7rem);
  color: #fff;
}

/* Ao rolar, o vídeo recua para dentro de um quadro. */
.hero__media {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: var(--ink);
  clip-path: inset(calc(var(--p, 0) * 3%) round calc(var(--p, 0) * 4px));
}

.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(calc(1.08 - var(--p, 0) * 0.08)) translate3d(0, calc(var(--p, 0) * 6%), 0);
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(10 12 15 / 0.86) 0%, rgb(10 12 15 / 0.55) 50%, rgb(10 12 15 / 0.2) 100%),
    linear-gradient(0deg, rgb(10 12 15 / 0.7) 0%, transparent 55%);
}

.hero__content {
  opacity: calc(1 - var(--p, 0) * 1.6);
  transform: translate3d(0, calc(var(--p, 0) * -90px), 0);
}

.hero__title {
  margin-bottom: clamp(2.5rem, 6vh, 4rem);
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 6.4vw, 6rem);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.05em;
  color: #fff;
}

.hero__line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}

.hero__word {
  display: inline-block;
  white-space: nowrap;
}

/* Cada caractere sobe de baixo da linha, inclinado, em onda. */
.hero__char {
  display: inline-block;
  transform-origin: left bottom;
  animation: hero-char 1.2s var(--ease) backwards;
  animation-delay: calc(150ms + var(--i) * 18ms);
}

.hero__line--em {
  color: rgb(255 255 255 / 0.55);
}

.hero__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgb(255 255 255 / 0.2);
  animation: hero-fade 1.1s var(--ease) 0.65s backwards;
}

.hero__lead {
  max-width: 48ch;
  font-size: 1.0625rem;
  color: rgb(255 255 255 / 0.78);
}

.hero__lead strong {
  color: #fff;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__cue {
  position: absolute;
  right: 0;
  bottom: 1.5rem;
  left: 0;
  width: max-content;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0;
  color: rgb(255 255 255 / 0.6);
  opacity: calc(1 - var(--p, 0) * 4);
  animation: hero-fade 1s var(--ease) 1.1s backwards;
}

.hero__cue i {
  position: relative;
  width: 1px;
  height: 36px;
  overflow: hidden;
  background: rgb(255 255 255 / 0.2);
}

.hero__cue i::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #fff;
  animation: hero-cue 2.4s var(--ease) infinite;
}

@keyframes hero-char {
  from {
    opacity: 0;
    transform: translate3d(0, 105%, 0) skewY(12deg) skewX(-10deg);
  }
}

@keyframes hero-fade {
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
}

@keyframes hero-cue {
  0% {
    transform: translateY(-100%);
  }

  60%,
  100% {
    transform: translateY(100%);
  }
}

@media (max-width: 720px) {
  .hero__cue {
    display: none;
  }

  .hero {
    padding-bottom: 3rem;
  }

  .hero__actions {
    width: 100%;
  }

  .hero__actions .btn {
    flex: 1 1 auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__video {
    transform: none;
  }
}
</style>
