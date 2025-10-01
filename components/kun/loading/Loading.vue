<script setup lang="ts">
import { useSlots, computed } from 'vue'

withDefaults(
  defineProps<{
    loading?: boolean
    description?: string
  }>(),
  {
    loading: false,
    description: '正在摸鱼中...咕咕咕'
  }
)

const slots = useSlots()

const isWrapperMode = computed(() => !!slots.default)
</script>

<template>
  <div class="contents">
    <div v-if="isWrapperMode" class="relative min-h-24">
      <div :class="cn('transition-opacity', loading && 'opacity-50')">
        <slot></slot>
      </div>

      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-0"
      >
        <div
          v-if="loading"
          class="bg-background/50 absolute inset-0 z-50 flex items-center justify-center rounded-lg"
        >
          <div class="flex flex-col items-center gap-3">
            <KunImageNative
              alt="loading"
              src="/kun.webp"
              class-name="h-48 w-48 rounded-lg"
            />
            <span class="info text-xl">{{ description }}</span>
          </div>
        </div>
      </transition>
    </div>

    <div v-else class="m-auto flex flex-col items-center gap-3">
      <KunImageNative
        alt="loading"
        src="/kun.webp"
        class="h-48 w-48 rounded-lg"
      />
      <span class="info">{{ description }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  color: var(--color-white);
  text-shadow:
    0 1px var(--color-foreground),
    1px 0 var(--color-foreground),
    -1px 0 var(--color-foreground),
    0 -1px var(--color-foreground),
    1px 2px var(--color-foreground),
    1px 2px var(--color-foreground),
    1px 2px var(--color-foreground),
    1px 2px var(--color-foreground);
}
</style>
