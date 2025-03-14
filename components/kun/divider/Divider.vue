<script setup lang="ts">
import type { KunUIColor } from '../ui/type'
import type { KunDividerProps } from './type'

const props = withDefaults(defineProps<KunDividerProps>(), {
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
    :class="[
      'flex items-center text-sm',
      orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
      className
    ]"
  >
    <div
      :class="[
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        withLabel
          ? orientation === 'horizontal'
            ? 'flex-grow-0'
            : ''
          : 'w-full',
        borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
        colorClasses[props.color]
      ]"
    />
    <div
      v-if="$slots.default"
      :class="[
        'text-sm text-gray-500',
        orientation === 'horizontal' ? 'px-3' : 'py-3'
      ]"
    >
      <slot />
    </div>
    <div
      v-if="withLabel"
      :class="[
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
        colorClasses
      ]"
    />
  </div>
</template>
