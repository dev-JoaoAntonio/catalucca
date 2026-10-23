<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const barEl = ref(null);
let frame = 0;

function update() {
  frame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  barEl.value.style.transform = `scaleX(${p})`;
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

onMounted(() => {
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <span ref="barEl"></span>
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  z-index: 120;
  height: 2px;
  pointer-events: none;
}

.scroll-progress span {
  display: block;
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
}
</style>
