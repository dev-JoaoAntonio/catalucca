<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  label: { type: String, default: '' },
});

const videoEl = ref(null);
const showControls = ref(false);
let observer = null;

// Os vídeos das soluções passam de 30 MB: só baixa quando estiver perto da
// tela e pausa ao sair. Com movimento reduzido, não toca sozinho.
onMounted(() => {
  const video = videoEl.value;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.src = props.src;
    showControls.value = true;
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!video.src) video.src = props.src;
        video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    },
    { rootMargin: '200px 0px' }
  );
  observer.observe(video);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <video
    ref="videoEl"
    muted
    loop
    playsinline
    preload="none"
    :poster="poster || undefined"
    :controls="showControls"
    :aria-label="label || undefined"
  ></video>
</template>
