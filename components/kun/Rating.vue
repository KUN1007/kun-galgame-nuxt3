<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number
    max?: number
    readonly?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    ariaLabel?: string
  }>(),
  {
    modelValue: 0,
    max: 5,
    readonly: false,
    disabled: false,
    size: 'md',
    ariaLabel: 'rating'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  set: [value: number]
}>()

const hoverValue = ref(0)

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-4 w-4'
    case 'lg':
      return 'h-6 w-6'
    default:
      return 'h-5 w-5'
  }
})

const stars = computed(() => Array.from({ length: props.max }, (_, i) => i + 1))

const current = computed(() => hoverValue.value || props.modelValue || 0)

const setValue = (val: number) => {
  if (props.readonly || props.disabled) return
  emit('update:modelValue', val)
  emit('set', val)
}

const onEnter = (val: number) => {
  if (props.readonly || props.disabled) return
  hoverValue.value = val
}

const onLeave = () => {
  if (props.readonly || props.disabled) return
  hoverValue.value = 0
}
</script>

<template>
  <div
    class="inline-flex items-center gap-1"
    role="radiogroup"
    :aria-label="ariaLabel"
  >
    <button
      v-for="val in stars"
      :key="val"
      type="button"
      :aria-checked="current >= val"
      role="radio"
      :class="
        cn(
          'disabled:text-default-200 cursor-pointer hover:scale-110 focus:outline-none disabled:cursor-not-allowed',
          current >= val ? 'text-secondary' : 'text-default-300'
        )
      "
      :disabled="disabled"
      @mouseenter="onEnter(val)"
      @mouseleave="onLeave"
      @click="setValue(val)"
      :title="`${val}/${max}`"
    >
      <KunIcon
        name="lucide:lollipop"
        :class="cn('transition-colors', current >= val ? '' : '', iconSize)"
      />
    </button>
  </div>
</template>
