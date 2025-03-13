<script setup lang="ts">
import type { KunUIColor, KunUISize } from './ui/type'

interface Props {
  classNames?: string
  color?: KunUIColor
  size?: KunUISize
}

withDefaults(defineProps<Props>(), {
  color: 'default',
  classNames: '',
  size: 'sm'
})

const colorClasses: Record<KunUIColor, string> = {
  default: 'bg-default/20 text-default-800',
  primary: 'bg-primary/20 text-primary-800',
  secondary: 'bg-secondary/20 text-secondary-800',
  success: 'bg-success/20 text-success-800',
  warning: 'bg-warning/20 text-warning-800',
  danger: 'bg-danger/20 text-danger-800'
}

const sizeClasses: Record<KunUISize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-sm',
  xl: 'px-6 py-3 text-base'
}
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center justify-center gap-1 rounded-full font-medium',
        colorClasses[color],
        sizeClasses[size],
        classNames
      )
    "
  >
    <slot />
  </span>
</template>
