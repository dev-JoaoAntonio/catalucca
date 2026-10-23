<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { getLenis } from '@/composables/useLenis';
import { useSectionLink } from '@/composables/useSectionLink';
import { EMAIL, PHONE_DISPLAY, whatsappLink } from '@/data/contact';
import AppIcon from '@/components/ui/AppIcon.vue';

const items = [
  { key: 'sobre', label: 'Sobre' },
  { key: 'tecnologia', label: 'Tecnologia' },
  { key: 'metodo', label: 'Método' },
  { key: 'solucoes', label: 'Soluções' },
  { key: 'haas', label: 'HaaS' },
  { key: 'faq', label: 'FAQ' },
];
const panelItems = [...items, { key: 'contato', label: 'Contato' }];

const route = useRoute();
const go = useSectionLink();

const open = ref(false);
const pastHero = ref(false);
const hidden = ref(false);
const active = ref('');
const indicator = ref({ x: 0, w: 0, visible: false });
const linkEls = [];

// Sobre o vídeo do hero a barra é transparente; nas demais páginas, sólida.
const solid = computed(() => !route.meta.landing || pastHero.value);

const pad = (n) => String(n).padStart(2, '0');

function setMenu(value) {
  open.value = value;
  const lenis = getLenis();
  if (lenis) value ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle('menu-open', value);
}

function navigate(key) {
  if (open.value) setMenu(false);
  go(`#${key}`);
}

let lastY = 0;
function onScroll() {
  const y = window.scrollY;
  pastHero.value = y > window.innerHeight - 120;
  // Esconde ao descer e reaparece ao subir.
  if (!open.value && Math.abs(y - lastY) > 6) {
    hidden.value = y > lastY && y > 240;
    lastY = y;
  }
}

function updateIndicator() {
  const el = linkEls[items.findIndex((item) => item.key === active.value)];
  indicator.value = el
    ? { x: el.offsetLeft, w: el.offsetWidth, visible: true }
    : { ...indicator.value, visible: false };
}

// Destaca o link da seção que ocupa o meio da tela.
let spy = null;
function observeSections() {
  spy?.disconnect();
  active.value = '';
  spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.dataset.spy;
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  document.querySelectorAll('[data-spy]').forEach((el) => spy.observe(el));
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) setMenu(false);
}

function onResize() {
  if (open.value && window.innerWidth >= 1080) setMenu(false);
  updateIndicator();
}

watch(active, updateIndicator);
watch(() => route.path, () => nextTick(observeSections));

onMounted(() => {
  onScroll();
  observeSections();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  document.addEventListener('keydown', onKeydown);
  // As fontes mudam a largura dos links depois do primeiro cálculo.
  document.fonts?.ready.then(updateIndicator);
});

onBeforeUnmount(() => {
  spy?.disconnect();
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  document.removeEventListener('keydown', onKeydown);
  document.documentElement.classList.remove('menu-open');
});
</script>

<template>
  <header
    id="header"
    class="nav"
    :class="{ 'is-solid': solid, 'is-hidden': hidden && !open, 'is-open': open }"
  >
    <div class="container nav__bar">
      <a href="/#inicio" class="nav__brand" @click.prevent="navigate('inicio')">
        <img src="/favicon/logo.png" alt="" width="34" height="34">
        <span>CATALUCCA</span>
      </a>

      <nav class="nav__links" aria-label="Seções da página">
        <a
          v-for="(item, i) in items"
          :key="item.key"
          :ref="(el) => (linkEls[i] = el)"
          :href="`/#${item.key}`"
          class="nav__link"
          :class="{ 'is-active': active === item.key }"
          :aria-current="active === item.key ? 'true' : undefined"
          @click.prevent="navigate(item.key)"
        >{{ item.label }}</a>
        <span
          class="nav__indicator"
          :class="{ 'is-visible': indicator.visible }"
          :style="{ transform: `translateX(${indicator.x}px)`, width: `${indicator.w}px` }"
          aria-hidden="true"
        ></span>
      </nav>

      <a href="/#contato" class="btn nav__cta" @click.prevent="navigate('contato')">
        Fale conosco
      </a>

      <button
        type="button"
        class="nav__toggle"
        :aria-expanded="open ? 'true' : 'false'"
        aria-controls="nav-panel"
        :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
        @click="setMenu(!open)"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <div id="nav-panel" class="nav__panel" :class="{ 'is-open': open }" :inert="!open">
      <nav class="container nav__panel-links" aria-label="Menu">
        <a
          v-for="(item, i) in panelItems"
          :key="item.key"
          :href="`/#${item.key}`"
          :style="{ '--i': i }"
          @click.prevent="navigate(item.key)"
        >
          <span class="mono">{{ pad(i + 1) }}</span>
          {{ item.label }}
        </a>
      </nav>
      <div class="container nav__panel-foot">
        <a :href="`mailto:${EMAIL}`"><AppIcon name="mail" />{{ EMAIL }}</a>
        <a :href="whatsappLink()" target="_blank" rel="noopener"><AppIcon name="whatsapp" />{{ PHONE_DISPLAY }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  color: #fff;
  transition: transform 0.5s var(--ease);
}

.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(255 255 255 / 0.86);
  border-bottom: 1px solid var(--line);
  backdrop-filter: saturate(1.6) blur(14px);
  -webkit-backdrop-filter: saturate(1.6) blur(14px);
  opacity: 0;
  transition: opacity 0.4s var(--ease);
}

.nav.is-solid {
  color: var(--ink);
}

.nav.is-solid::before {
  opacity: 1;
}

.nav.is-hidden {
  transform: translate3d(0, -100%, 0);
}

.nav.is-open {
  color: #fff;
}

.nav.is-open::before {
  opacity: 0;
}

.nav__bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
  height: var(--header-h);
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-right: auto;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.16em;
}

.nav__brand img {
  width: 34px;
  height: auto;
}

.nav__links {
  position: relative;
  display: flex;
  gap: 0.25rem;
}

.nav__link {
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.78;
  transition: opacity 0.3s var(--ease);
}

.nav__link:hover,
.nav__link.is-active {
  opacity: 1;
}

.nav__indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
  opacity: 0;
  transition:
    transform 0.5s var(--ease),
    width 0.5s var(--ease),
    opacity 0.3s;
}

.nav__indicator.is-visible {
  opacity: 1;
}

.nav__cta {
  min-height: 42px;
  padding-inline: 1.2rem;
  background: #fff;
  color: var(--primary);
}

.nav.is-solid .nav__cta {
  background: var(--primary);
  color: #fff;
}

.nav__cta:hover,
.nav.is-solid .nav__cta:hover {
  background: var(--accent);
  color: #fff;
}

.nav.is-open .nav__cta {
  display: none;
}

.nav__toggle {
  display: none;
  position: relative;
  width: 44px;
  height: 44px;
  margin-right: -0.5rem;
}

.nav__toggle span {
  position: absolute;
  left: 11px;
  width: 22px;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.45s var(--ease);
}

.nav__toggle span:first-child {
  transform: translateY(-4px);
}

.nav__toggle span:last-child {
  transform: translateY(4px);
}

.nav.is-open .nav__toggle span:first-child {
  transform: rotate(45deg);
}

.nav.is-open .nav__toggle span:last-child {
  transform: rotate(-45deg);
}

/* Painel móvel */
.nav__panel {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--header-h) + 2rem) 0 2rem;
  background: var(--navy-deep);
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.7s var(--ease);
}

.nav__panel.is-open {
  clip-path: inset(0 0 0 0);
}

.nav__panel-links {
  display: grid;
}

.nav__panel-links a {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
  font-size: clamp(1.5rem, 6vw, 2.25rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  opacity: 0;
  transform: translate3d(0, 16px, 0);
  transition:
    opacity 0.5s var(--ease),
    transform 0.6s var(--ease);
}

.nav__panel.is-open .nav__panel-links a {
  opacity: 1;
  transform: none;
  transition-delay: calc(150ms + var(--i) * 45ms);
}

.nav__panel-links .mono {
  font-size: 0.75rem;
  color: var(--accent-light);
}

.nav__panel-foot {
  display: grid;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: rgb(255 255 255 / 0.7);
}

.nav__panel-foot a {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.nav__panel-foot .icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 1079px) {
  .nav__links {
    display: none;
  }

  .nav__toggle {
    display: block;
  }

  .nav__bar {
    gap: 1rem;
  }
}

@media (min-width: 1080px) {
  .nav__panel {
    display: none;
  }
}

@media (max-width: 520px) {
  .nav__cta {
    display: none;
  }
}
</style>
