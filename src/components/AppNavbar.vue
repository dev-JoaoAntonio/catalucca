<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { getLenis } from '@/composables/useLenis';

const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);

const items = [
  {
    to: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    to: '/quem-somos',
    label: 'Quem Somos',
    icon: 'compass',
  },
  {
    to: '/educacao',
    label: 'Educação',
    icon: 'graduation',
  },
  {
    to: '/operacional-privado',
    label: 'Operacional Privado',
    icon: 'sprout',
  },
  {
    to: '/governo',
    label: 'Governo',
    icon: 'landmark',
  },
];

const isActive = (path) => route.path === path;

const ariaExpanded = computed(() => (isMenuOpen.value ? 'true' : 'false'));
const ariaLabel = computed(() => (isMenuOpen.value ? 'Fechar menu' : 'Abrir menu'));

function toggleMenu() {
  setMenu(!isMenuOpen.value);
}

function setMenu(open) {
  isMenuOpen.value = open;
  const lenis = getLenis();
  if (lenis) {
    open ? lenis.stop() : lenis.start();
  }
}

function onItemClick() {
  if (isMenuOpen.value) setMenu(false);
}

function onContactClick() {
  if (isMenuOpen.value) setMenu(false);
}

function handleScroll() {
  isScrolled.value = window.scrollY > 8;
}

function handleClickOutside(event) {
  if (!isMenuOpen.value) return;
  const navbar = document.getElementById('header');
  if (navbar && !navbar.contains(event.target)) {
    setMenu(false);
  }
}

function handleEscape(event) {
  if (event.key === 'Escape' && isMenuOpen.value) {
    setMenu(false);
  }
}

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }" id="header">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <img src="/favicon/logo.png" alt="Logo Catalucca" class="navbar-logo">
        <span class="navbar-brand-text">CATALUCCA</span>
      </router-link>

      <button
        class="navbar-toggle"
        id="navbar-toggle"
        :aria-expanded="ariaExpanded"
        :aria-label="ariaLabel"
        @click="toggleMenu"
      >
        <span class="navbar-toggle-bar"></span>
        <span class="navbar-toggle-bar"></span>
        <span class="navbar-toggle-bar"></span>
      </button>
    </div>

    <div class="navbar-mobile" :class="{ active: isMenuOpen }" id="navbar-mobile">
      <nav class="navbar-mobile-nav" aria-label="Navegação móvel">
        <router-link
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActive(item.to) }"
          @click="onItemClick"
        >
          <NavIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
        <router-link to="/contato" class="nav-item nav-item-cta" @click="onContactClick">
          <NavIcon name="message" />
          <span>Contato</span>
        </router-link>
      </nav>
    </div>
  </header>

  <nav class="nav-dock" :class="{ scrolled: isScrolled }" aria-label="Navegação principal">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="nav-dock-item"
      :class="{ active: isActive(item.to) }"
    >
      <NavIcon :name="item.icon" />
      <span class="nav-dock-label">{{ item.label }}</span>
    </router-link>
    <router-link to="/contato" class="nav-dock-item nav-dock-item-cta" :class="{ active: isActive('/contato') }">
      <NavIcon name="message" />
      <span class="nav-dock-label">Contato</span>
    </router-link>
  </nav>
</template>

<script>
import { h } from 'vue';

const ICONS = {
  home: () => h('svg', {
    class: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [
    h('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    h('polyline', { points: '9 22 9 12 15 12 15 22' }),
  ]),
  graduation: () => h('svg', {
    class: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [
    h('path', { d: 'M22 10v6M2 10l10-5 10 5-10 5z' }),
    h('path', { d: 'M6 12v5c3 3 9 3 12 0v-5' }),
  ]),
  sprout: () => h('svg', {
    class: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [
    h('path', { d: 'M7 20h10' }),
    h('path', { d: 'M10 20c5.5-2.5.42-6.2 5-8' }),
    h('path', { d: 'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z' }),
    h('path', { d: 'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z' }),
  ]),
  landmark: () => h('svg', {
    class: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [
    h('line', { x1: 3, x2: 21, y1: 22, y2: 22 }),
    h('line', { x1: 6, x2: 6, y1: 18, y2: 11 }),
    h('line', { x1: 10, x2: 10, y1: 18, y2: 11 }),
    h('line', { x1: 14, x2: 14, y1: 18, y2: 11 }),
    h('line', { x1: 18, x2: 18, y1: 18, y2: 11 }),
    h('polygon', { points: '12 2 20 7 4 7' }),
  ]),
  message: () => h('svg', {
    class: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [
    h('path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' }),
  ]),
  compass: () => h('svg', {
    class: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [
    h('circle', { cx: 12, cy: 12, r: 10 }),
    h('polygon', { points: '16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' }),
  ]),
};

const NavIcon = {
  name: 'NavIcon',
  props: { name: { type: String, required: true } },
  setup(props) {
    return () => (ICONS[props.name] ? ICONS[props.name]() : null);
  },
};

export default { components: { NavIcon } };
</script>
