<script setup lang="ts">
import type { KunUIColor } from '../ui/type'
import type { KunDividerProps } from './type'

withDefaults(defineProps<KunDividerProps>(), {
  orientation: 'horizontal',
  color: 'default',
  borderStyle: 'solid',
  className: '',
  withLabel: false
})

const colorClasses: Record<KunUIColor, string> = {
  default: 'border-default/20',
  primary: 'border-primary/20',
  secondary: 'border-secondary/20',
  success: 'border-success/20',
  warning: 'border-warning/20',
  danger: 'border-danger/20'
}
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center',
        orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
        className
      )
    "
    role="separator"
  >
    <div
      :class="[
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
        colorClasses[color]
      ]"
    />
    <div
      v-if="$slots.default"
      :class="[
        'text-default-500 text-sm',
        orientation === 'horizontal' ? 'px-4 whitespace-nowrap' : 'py-4'
      ]"
    >
      <slot />
    </div>
    <div
      v-if="$slots.default"
      :class="[
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
        colorClasses[color]
      ]"
    />
  </div>
</template>
