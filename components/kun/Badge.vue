<script setup lang="ts">
type BadgeColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

interface Props {
  color?: BadgeColor
  classNames?: string
}

withDefaults(defineProps<Props>(), {
  color: 'default',
  classNames: ''
})

const colorClasses = {
  default: 'bg-default/20 text-default-800',
  primary: 'bg-primary/20 text-primary-800',
  secondary: 'bg-secondary/20 text-secondary-800',
  success: 'bg-success/20 text-success-800',
  warning: 'bg-warning/20 text-warning-800',
  danger: 'bg-danger/20 text-danger-800'
}
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
        colorClasses[color as BadgeColor] || colorClasses.default,
        classNames
      )
    "
  >
    <slot />
  </span>
</template>
