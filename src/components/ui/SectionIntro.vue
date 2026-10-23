<script setup>
defineProps({
  index: { type: String, default: '' },
  label: { type: String, required: true },
  align: { type: String, default: 'left' },
});
</script>

<template>
  <header class="intro" :class="`intro--${align}`">
    <p class="eyebrow" v-reveal>
      <span v-if="index" class="eyebrow__index">{{ index }}</span>
      {{ label }}
    </p>
    <h2 class="title intro__title" v-reveal="{ delay: 80 }">
      <slot name="title" />
    </h2>
    <p v-if="$slots.default" class="lead intro__lead" v-reveal="{ delay: 160 }">
      <slot />
    </p>
  </header>
</template>

<style scoped>
.intro {
  max-width: 760px;
}

.intro--center {
  margin-inline: auto;
  text-align: center;
}

.intro__title {
  margin-top: 1.25rem;
}

.intro__lead {
  margin-top: 1.25rem;
  max-width: 62ch;
}

.intro--center .intro__lead {
  margin-inline: auto;
}
</style>
