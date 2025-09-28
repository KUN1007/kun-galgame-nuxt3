<script setup lang="ts">
import type {
  KunUIVariant,
  KunUIColor,
  KunUISize,
  KunUIRounded
} from '../ui/type'

export interface KunProgressProps {
  value?: number
  max?: number
  variant?: KunUIVariant | 'gradient' | 'circle' | 'striped'
  color?: KunUIColor
  size?: KunUISize
  rounded?: KunUIRounded
  showLabel?: boolean
  indeterminate?: boolean
  className?: string
}

const props = withDefaults(defineProps<KunProgressProps>(), {
  value: 0,
  max: 100,
  variant: 'solid',
  color: 'primary',
  size: 'md',
  rounded: 'lg',
  showLabel: false,
  indeterminate: false,
  className: ''
})

const percentage = computed(() => {
  const safeMax = props.max || 100
  const safeValue = Math.min(Math.max(props.value, 0), safeMax)
  return Math.round((safeValue / safeMax) * 100)
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-1'
    case 'sm':
      return 'h-2'
    case 'md':
      return 'h-3'
    case 'lg':
      return 'h-4'
    case 'xl':
      return 'h-5'
    default:
      return 'h-3'
  }
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

const colorClasses: Record<string, string> = {
  default: 'bg-default',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger'
}

const barClasses = computed(() => {
  const base = colorClasses[props.color] || 'bg-primary'
  switch (props.variant) {
    case 'solid':
      return base
    case 'gradient':
      return `bg-gradient-to-r from-${props.color}-400 to-${props.color}-600`
    case 'striped':
      return `${base} bg-[length:1rem_1rem] bg-gradient-to-r from-white/20 to-transparent animate-[progress-stripes_1s_linear_infinite]`
    default:
      return base
  }
})

const circleRadius = 45
const circleCircumference = 2 * Math.PI * circleRadius
const circleOffset = computed(
  () => circleCircumference - (percentage.value / 100) * circleCircumference
)
</script>

<template>
  <div class="contents">
    <div
      v-if="variant === 'circle'"
      class="relative inline-flex items-center justify-center"
    >
      <svg class="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          class="text-default-300"
          stroke="currentColor"
          stroke-width="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          :class="colorClasses[color]"
          stroke="currentColor"
          stroke-width="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          stroke-linecap="round"
          :stroke-dasharray="circleCircumference"
          :stroke-dashoffset="circleOffset"
          style="transition: stroke-dashoffset 0.35s ease"
        />
      </svg>
      <span v-if="showLabel" class="absolute text-sm font-medium">
        {{ percentage }}%
      </span>
    </div>

    <div
      v-else
      class="bg-default-300 w-full overflow-hidden"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : percentage"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :class="[sizeClasses, roundedClasses, className]"
    >
      <div
        :class="
          cn(
            'flex h-full items-center transition-all duration-500 ease-out',
            barClasses
          )
        "
        :style="indeterminate ? 'width:100%' : `width:${percentage}%`"
      >
        <span
          v-if="showLabel && !indeterminate"
          class="px-2 text-xs font-medium text-white"
        >
          {{ percentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes progress-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
