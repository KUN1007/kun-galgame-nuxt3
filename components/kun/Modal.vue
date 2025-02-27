<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

withDefaults(
  defineProps<{
    modalValue: boolean
    className?: string
  }>(),
  { className: '' }
)

const emits = defineEmits<{
  updateValue: [modalValue: boolean]
}>()

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emits('updateValue', false)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="modalValue"
        :class="
          cn(
            'bg-default-800/70 dark:bg-background/70 fixed z-100 flex size-full transition-all',
            className
          )
        "
        @click="$emit('updateValue', false)"
        tabindex="0"
      >
        <div
          class="bg-background m-auto min-w-80 rounded-lg border p-6 shadow-lg transition-all"
          @click.stop
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.dialog-enter-from {
  opacity: 0;
}

.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
