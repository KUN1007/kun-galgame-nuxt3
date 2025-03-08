<script setup lang="ts">
import { useRipple } from '../ripple/useRipple'

interface Props {
  isHoverable?: boolean
  isPressable?: boolean
  isTransparent?: boolean
  bordered?: boolean
  className?: string
  contentClass?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  isPressable: false,
  isHoverable: true,
  isTransparent: true,
  bordered: true,
  className: '',
  contentClass: '',
  href: '/'
})

const router = useRouter()
const { ripples, onClick } = useRipple()

const handleKunCardClick = (event: MouseEvent) => {
  if (props.isPressable) {
    router.push(props.href)
    onClick(event)
  }
}
</script>

<template>
  <div
    :class="[
      'group relative flex flex-col gap-3 overflow-hidden rounded-lg p-3 shadow transition-all duration-200',
      isHoverable && 'hover:bg-default-100 hover:shadow-md',
      bordered && 'border',
      isPressable && 'cursor-pointer active:scale-[0.97]',
      isTransparent ? '' : 'bg-background',
      className
    ]"
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

    <div v-if="$slots.footer" class="border-t bg-gray-50 px-3 py-2">
      <slot name="footer" />
    </div>

    <KunRipple :ripples="ripples" />
  </div>
</template>
