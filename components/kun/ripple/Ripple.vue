<script lang="ts" setup>
import type { RippleType } from './useRipple'

defineProps<{
  ripples: RippleType[]
}>()
</script>

<template>
  <span
    v-for="ripple in ripples"
    :key="ripple.key"
    class="bg-foreground/30 ripple pointer-events-none absolute rounded-full"
    :style="{
      width: `${ripple.size}px`,
      height: `${ripple.size}px`,
      top: `${ripple.y}px`,
      left: `${ripple.x}px`
    }"
  />
</template>

<style lang="scss" scoped>
.ripple {
  transform: scale(0);
  animation: ripple-animation 0.6s ease-out;
}

@keyframes ripple-animation {
  to {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
