<script setup lang="ts">
defineProps<{
  isShowDialog: boolean
}>()
</script>

<template>
  <Teleport to="body" :disabled="!isShowDialog">
    <Transition name="dialog">
      <div v-if="isShowDialog" class="mask" tabindex="0">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  display: flex;
  transition: opacity 0.3s ease;
  color: var(--kungalgame-font-color-3);
}

.dialog-enter-from {
  opacity: 0;
}

.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  &:deep(.container) {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
