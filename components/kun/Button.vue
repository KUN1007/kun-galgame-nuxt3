<script setup lang="ts">
import { useRipple } from './utils/useRipple'

type KunButtonVariant =
  | 'solid'
  | 'bordered'
  | 'light'
  | 'flat'
  | 'faded'
  | 'shadow'
  | 'ghost'

type KunButtonColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

interface ButtonProps {
  variant?: KunButtonVariant
  color?: KunButtonColor
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: boolean
  iconPosition?: 'left' | 'right'
  className?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  rounded: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  icon: false,
  iconPosition: 'left',
  className: ''
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-xs px-2 py-1'
    case 'sm':
      return 'text-sm px-3 py-1.5'
    case 'md':
      return 'text-sm px-4 py-2'
    case 'lg':
      return 'text-base px-5 py-2.5'
    case 'xl':
      return 'text-lg px-6 py-3'
    default:
      return 'text-sm px-4 py-2'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'solid':
      return 'shadow-sm'
    case 'bordered':
      return 'border-2 bg-transparent'
    case 'light':
      return 'bg-opacity-20 border-transparent'
    case 'flat':
      return 'bg-opacity-20 border-transparent shadow-none'
    case 'faded':
      return 'bg-opacity-10 border-transparent'
    case 'shadow':
      return 'shadow-lg'
    case 'ghost':
      return 'bg-transparent border-transparent shadow-none hover:bg-opacity-10'
    default:
      return 'shadow-sm'
  }
})

const colorClasses = computed(() => {
  const baseClasses = {
    solid: (color: KunButtonColor) =>
      `bg-${color}-500 text-white hover:bg-${color}-400 border-${color}-500`,
    bordered: (color: KunButtonColor) =>
      `border-${color}-500 text-${color}-500 hover:bg-${color}-50`,
    light: (color: KunButtonColor) =>
      `bg-${color}-200 text-${color}-400 hover:bg-${color}-300 border-transparent`,
    flat: (color: KunButtonColor) =>
      `bg-${color}-100 text-${color}-400 hover:bg-${color}-200`,
    faded: (color: KunButtonColor) =>
      `bg-${color}-100 text-${color}-400 hover:bg-${color}-200`,
    shadow: (color: KunButtonColor) =>
      `bg-${color}-500 text-white hover:bg-${color}-400 border-${color}-500`,
    ghost: (color: KunButtonColor) => `text-${color}-500 hover:bg-${color}-100`
  }

  return baseClasses[props.variant](props.color)
})

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

const { ripples, onClick } = useRipple()
</script>

<template>
  <button
    :class="
      cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-all active:scale-[0.97] disabled:opacity-50',
        sizeClasses,
        variantClasses,
        colorClasses,
        roundedClasses,
        fullWidth ? 'w-full' : '',
        className
      )
    "
    :disabled="disabled || loading"
    :type="type"
    @click="
      (event) => {
        onClick(event)
        $emit('click', event)
      }
    "
  >
    <Icon class="text-sm" v-if="loading" name="svg-spinners:90-ring-with-bg" />
    <span v-if="icon && iconPosition === 'left'" class="mr-2">
      <slot name="icon" />
    </span>
    <slot />
    <span v-if="icon && iconPosition === 'right'" class="ml-2">
      <slot name="icon" />
    </span>

    <KunUtilsRipple :ripples="ripples" />
  </button>
</template>
