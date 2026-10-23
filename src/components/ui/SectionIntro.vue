<script setup>
defineProps({
  align: { type: String, default: 'left' },
});
</script>

<template>
  <header class="intro" :class="`intro--${align}`">
    <h2 class="title" v-split>
      <slot name="title" />
    </h2>
    <p v-if="$slots.default" class="lead intro__lead" v-reveal="{ delay: 100 }">
      <slot />
    </p>
  </header>
</template>

<style scoped>
.intro {
  max-width: 820px;
}

.intro--center {
  margin-inline: auto;
  text-align: center;
}

.intro__lead {
  margin-top: 1.5rem;
  max-width: 62ch;
}

.intro--center .intro__lead {
  margin-inline: auto;
}
</style>
