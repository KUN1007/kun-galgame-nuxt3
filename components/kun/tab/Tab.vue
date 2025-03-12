<script setup lang="ts">
import type { KunTabItem, KunTabVariant, KunTabColor, KunTabSize } from './type'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    items: KunTabItem[]
    modelValue: string
    variant?: KunTabVariant
    color?: KunTabColor
    size?: KunTabSize
    iconSize?: string
    fullWidth?: boolean
    disabled?: boolean
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    disableAnimation?: boolean
  }>(),
  {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    iconSize: '1.2em',
    fullWidth: false,
    disabled: false,
    radius: 'lg',
    disableAnimation: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const containerClasses = computed(() => {
  return cn(
    'inline-flex',
    props.fullWidth && 'w-full',
    props.disabled && 'opacity-50 cursor-not-allowed'
  )
})

const tabListClasses = computed(() => {
  return cn(
    'scrollbar-hide flex h-fit items-center gap-2 overflow-x-scroll',
    props.variant === 'solid' && 'bg-default-100 rounded-lg p-1',
    props.variant === 'underlined' && 'border-b border-default-200',
    props.fullWidth && 'w-full'
  )
})

const tabItemClasses = computed(() => (item: KunTabItem) => {
  const isSelected = props.modelValue === item.value
  const baseClasses = 'whitespace-nowrap cursor-pointer select-none'

  if (props.variant === 'solid') {
    return cn(
      baseClasses,
      'rounded-lg px-3 py-2',
      isSelected ? `bg-${props.color} text-white` : `hover:text-${props.color}`,
      item.disabled && 'opacity-50 cursor-not-allowed',
      !props.disableAnimation && 'transition-colors'
    )
  }

  if (props.variant === 'underlined') {
    return cn(
      baseClasses,
      'px-4 py-2 relative',
      isSelected && `text-${props.color} border-b-2 border-${props.color}`,
      isSelected &&
        'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
      isSelected && `after:bg-${props.color}`,
      !isSelected && 'hover:text-default-900',
      item.disabled && 'opacity-50 cursor-not-allowed',
      !props.disableAnimation && 'after:transition-all'
    )
  }
})

const handleTabClick = (item: KunTabItem) => {
  if (props.disabled || item.disabled) {
    return
  }
  if (item.href) {
    router.push(item.href)
  }

  emit('update:modelValue', item.value)
  emit('change', item.value)
}
</script>

<template>
  <div :class="containerClasses">
    <div :class="tabListClasses" role="tablist">
      <div
        v-for="(item, index) in items"
        :key="index"
        role="tab"
        :aria-selected="modelValue === item.value"
        :aria-disabled="item.disabled || disabled"
        :tabindex="item.disabled || disabled ? -1 : 0"
        @click="handleTabClick(item)"
        @keydown.enter="handleTabClick(item)"
        @keydown.space="handleTabClick(item)"
        class="flex items-center gap-2"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          :size="iconSize"
          :class="[
            modelValue === item.value ? `text-${color}` : 'text-default-500',
            'transition-colors'
          ]"
        />
        <span v-if="item.textValue" :class="tabItemClasses(item)">
          {{ item.textValue }}
        </span>
      </div>
    </div>
  </div>
</template>
