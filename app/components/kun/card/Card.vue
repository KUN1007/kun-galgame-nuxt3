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
  color?: KunUIColor | 'background'
}

const props = withDefaults(defineProps<Props>(), {
  isPressable: false,
  isHoverable: true,
  isTransparent: true,
  bordered: true,
  className: '',
  contentClass: '',
  href: '/',
  color: 'background'
})

const router = useRouter()
const { ripples, onClick } = useRipple()

const handleKunCardClick = (event: MouseEvent) => {
  if (props.isPressable) {
    router.push(props.href)
    onClick(event)
  }
}

const colorClasses: Record<KunUIColor | 'background', string> = {
  background: 'bg-background',
  default: 'bg-default-100/70',
  primary: 'bg-primary-100/70 border-primary-300',
  secondary: 'bg-secondary-100/70 border-secondary-300',
  success: 'bg-success-100/70 border-success-300',
  warning: 'bg-warning-100/70 border-warning-300',
  danger: 'bg-danger-100/70 border-danger-300'
}
</script>

<template>
  <div
    :class="
      cn(
        'border-default-300 relative flex flex-col gap-3 overflow-hidden rounded-lg p-3 shadow transition-all duration-200',
        isHoverable && 'hover:bg-default-100 hover:shadow-md',
        bordered && 'border',
        isPressable && 'cursor-pointer active:scale-[0.97]',
        isTransparent ? '' : colorClasses[props.color],
        className
      )
    "
    :role="isPressable ? 'button' : 'div'"
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
  </div>
</template>
