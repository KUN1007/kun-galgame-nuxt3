<script setup lang="ts">
import type { KunUIColor } from './ui/type'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    type?: string
    color?: KunUIColor
    className?: string
    placeholder?: string
    helperText?: string
    error?: string
    size?: string
    required?: boolean
    disabled?: boolean
    darkBorder?: boolean
    autofocus?: boolean
  }>(),
  {
    type: 'text',
    color: 'default',
    className: '',
    modelValue: '',
    label: '',
    placeholder: '',
    helperText: '',
    error: '',
    size: 'md',
    required: false,
    disabled: false,
    darkBorder: true,
    autofocus: false
  }
)

const emits = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const input = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const kunUniqueId = useKunUniqueId('kun-input')

const colorClass: Record<KunUIColor, string> = {
  default: 'focus:ring-default',
  primary: 'focus:ring-primary',
  secondary: 'focus:ring-secondary',
  success: 'focus:ring-success',
  warning: 'focus:ring-warning',
  danger: 'focus:ring-danger'
}

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

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emits('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emits('focus', event)
}

onMounted(() => {
  if (props.autofocus) {
    isFocused.value = true
    input.value?.focus()
  }
})

defineExpose({
  focus: () => input.value?.focus(),
  blur: () => input.value?.blur(),
  select: () => input.value?.select()
})
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="kunUniqueId"
      class="text-default-700 mb-1 block text-sm font-medium"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="kunUniqueId"
        ref="input"
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="
          cn(
            'border-default/20 block w-full rounded-md border px-2 py-1 text-sm transition duration-150 ease-in-out focus:border-transparent focus:ring-2',
            colorClass[color],
            sizeClasses,
            darkBorder && 'dark:border-default-200',
            $slots.prefix && 'pl-10',
            $slots.suffix && 'pr-10',
            disabled && 'bg-default-100 cursor-not-allowed',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : '',
            className
          )
        "
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div
        v-if="$slots.prefix"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot name="prefix" />
      </div>

      <div
        v-if="$slots.suffix"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <slot name="suffix" />
      </div>
    </div>

    <p v-if="helperText && !error" class="text-default-500 mt-1 text-sm">
      {{ helperText }}
    </p>

    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
