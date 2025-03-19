<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  message: string
  type: 'warn' | 'success' | 'error' | 'info'
  richText?: boolean
}>()

const isRichText = computed(() => props.richText ?? false)

const animationClass = computed(
  () =>
    ({
      warn: 'animate-shake',
      success: 'animate-bounceInDown',
      error: 'animate-tada',
      info: 'animate-bounce'
    })[props.type]
)

const borderColorClass = computed(
  () =>
    ({
      warn: 'border-warning',
      success: 'border-success',
      error: 'border-danger',
      info: 'border-primary'
    })[props.type]
)

const iconColorClass = computed(
  () =>
    ({
      warn: 'var(--color-warning)',
      success: 'var(--color-success)',
      error: 'var(--color-danger)',
      info: 'var(--color-primary)'
    })[props.type]
)

const iconName = computed(
  () =>
    ({
      warn: 'lucide:triangle-alert',
      success: 'lucide:check',
      error: 'lucide:x',
      info: 'lucide:info'
    })[props.type]
)
</script>

<template>
  <div class="fixed top-20 right-0 left-0 z-2000 flex w-full">
    <div
      :class="
        cn(
          'mx-auto flex items-center rounded-lg border bg-white px-6 py-3 text-lg shadow dark:bg-black',
          animationClass,
          borderColorClass
        )
      "
    >
      <Icon :color="iconColorClass" class="mr-4 text-2xl" :icon="iconName" />
      <span v-if="!isRichText" class="break-all">{{ message }}</span>
      <div v-else v-html="message" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Fix the iconify/vue Icon color error */
:deep(*) {
  color: inherit;
}
</style>
