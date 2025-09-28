<script setup lang="ts">
import type { KunUIColor } from '../ui/type'
import type { KunLinkProps } from './type'

const props = withDefaults(defineProps<KunLinkProps>(), {
  to: '',
  color: 'primary',
  underline: 'always',
  size: 'md',
  className: '',
  rel: '',
  target: '_self',
  isShowAnchorIcon: false
})

const underlineClasses = computed(() => {
  switch (props.underline) {
    case 'none':
      return ''
    case 'hover':
      return 'hover:underline underline-offset-3'
    case 'always':
      return 'underline underline-offset-3'
    default:
      return 'underline underline-offset-3'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-xs'
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-base'
    case 'lg':
      return 'text-lg'
    case 'xl':
      return 'text-xl'
    default:
      return 'text-base'
  }
})

const colorClasses: Record<KunUIColor, string> = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger'
}
</script>

<template>
  <NuxtLink
    :is="tag"
    :to="to"
    :class="
      cn(
        'flex inline-flex items-center gap-2 break-all',
        underlineClasses,
        sizeClasses,
        colorClasses[color],
        className
      )
    "
    :rel="rel"
    :target="target"
    v-bind="$attrs"
  >
    <slot name="prefix"></slot>
    <slot></slot>
    <KunIcon v-if="props.isShowAnchorIcon" name="lucide:external-link" />
    <slot name="suffix"></slot>
  </NuxtLink>
</template>
