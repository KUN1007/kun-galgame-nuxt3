<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modalValue: boolean
    className?: string
    innerClassName?: string
    isDismissable?: boolean
    isShowCloseButton?: boolean
    withContainer?: boolean
  }>(),
  {
    className: '',
    innerClassName: '',
    isDismissable: true,
    isShowCloseButton: true,
    withContainer: true
  }
)

const emits = defineEmits<{
  'update:modalValue': [value: boolean]
  close: []
}>()

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

const handleCloseKunModal = () => {
  if (props.isDismissable) {
    emits('update:modalValue', false)
    emits('close')
  }
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleCloseKunModal()
  }
})

watch(
  () => props.modalValue,
  (newValue) => {
    if (newValue) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }
)

onMounted(() => {
  if (props.modalValue) {
    lockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="kun-modal">
      <div
        v-if="modalValue"
        :class="
          cn(
            'bg-default-800/70 dark:bg-background/70 fixed top-0 left-0 z-1007 flex h-full w-full items-center justify-center p-3 transition-all',
            className
          )
        "
        @click="handleCloseKunModal"
        tabindex="0"
      >
        <div
          v-if="withContainer"
          :class="
            cn(
              'bg-content1/85 scrollbar-hide relative m-auto max-h-[90vh] min-w-80 overflow-y-auto rounded-lg border p-6 backdrop-blur-[var(--kun-background-blur)] transition-all',
              innerClassName
            )
          "
          @click.stop
        >
          <slot />

          <KunButton
            v-if="isShowCloseButton"
            color="default"
            variant="light"
            class-name="absolute top-1 right-1"
            rounded="full"
            :is-icon-only="true"
            @click="
              () => {
                emits('update:modalValue', false)
                emits('close')
              }
            "
          >
            <KunIcon class="icon" name="lucide:x" />
          </KunButton>
        </div>

        <slot v-else />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.kun-modal-enter-active,
.kun-modal-leave-active {
  transition: all 0.3s ease;
}

.kun-modal-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.kun-modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
