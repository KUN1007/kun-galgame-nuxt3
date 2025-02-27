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
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
        `bg-${color}-100 text-${color}-800 text-${color}-800 dark:bg-${color}-900/30 dark:text-${color}-200`,
        classNames
      )
    "
  >
    <slot />
  </span>
</template>
