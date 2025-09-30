<script setup lang="ts">
import { useRipple } from '../ripple/useRipple'
import type { KunUIColor } from '~/components/kun/ui/type'

interface Props {
  isHoverable?: boolean
  isPressable?: boolean
  isTransparent?: boolean
  bordered?: boolean
  className?: string
  contentClass?: string
  href?: string
  rounded?: string
  color?: KunUIColor | 'background'
  darkBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPressable: false,
  isHoverable: true,
  isTransparent: true,
  bordered: true,
  className: '',
  contentClass: '',
  href: '/',
  rounded: 'lg',
  color: 'background',
  darkBorder: false
})

const { ripples, onClick } = useRipple()

const handleKunCardClick = (event: MouseEvent) => {
  if (props.isPressable) {
    onClick(event)
  }
}

const colorClasses: Record<KunUIColor | 'background', string> = {
  background: 'bg-background',
  default: 'bg-default-100/30',
  primary: 'bg-primary-100/30 border-primary-300',
  secondary: 'bg-secondary-100/30 border-secondary-300',
  success: 'bg-success-100/30 border-success-300',
  warning: 'bg-warning-100/30 border-warning-300',
  danger: 'bg-danger-100/30 border-danger-300'
}

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'none':
      return 'rounded-none'
    case 'sm':
      return 'rounded-sm'
    case 'md':
      return 'rounded-md'
    case 'lg':
      return 'rounded-lg'
    case 'full':
      return 'rounded-full'
    default:
      return 'rounded-lg'
  }
})
</script>

<template>
  <component
    :is="isPressable ? defineNuxtLink({}) : 'div'"
    :class="
      cn(
        'relative flex flex-col gap-3 p-3 backdrop-blur-[var(--kun-background-blur)] transition-all duration-200',
        isHoverable && 'hover:bg-default-100',
        bordered && 'border-default/20 border',
        darkBorder &&
          cn(
            'dark:border-default-200 border border-transparent',
            bordered && 'border-default/20'
          ),
        isPressable && 'cursor-pointer overflow-hidden active:scale-[0.97]',
        isTransparent ? 'backdrop-blur-none' : colorClasses[props.color],
        roundedClasses,
        className
      )
    "
    :to="props.href"
    @click="handleKunCardClick"
  >
    <div v-if="$slots.header" class="border-b">
      <slot name="header" />
    </div>

    <div v-if="$slots.cover" class="w-full">
      <slot name="cover" />
    </div>

    <div
      :class="cn('flex h-full flex-col justify-between gap-1', contentClass)"
    >
      <slot />
    </div>

    <div v-if="$slots.footer" class="bg-default-100 border-t px-3 py-2">
      <slot name="footer" />
    </div>

    <KunRipple :ripples="ripples" />
  </component>
</template>
