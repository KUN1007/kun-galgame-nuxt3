<script setup lang="ts">
import type { KunUIColor } from './ui/type'

withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    type?: string
    color?: KunUIColor
    className?: string
    placeholder?: string
    helperText?: string
    error?: string
    required?: boolean
    disabled?: boolean
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
    required: false,
    disabled: false
  }
)

const emits = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const input = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const stableId = useId()
const computedId = computed(() => `kun-input-${stableId}`)

const colorClass: Record<KunUIColor, string> = {
  default: 'bg-default/20 focus:ring-default',
  primary: 'bg-default/20 focus:border-primary',
  secondary: 'bg-default/20 focus:border-secondary',
  success: 'bg-default/20 focus:border-success',
  warning: 'bg-default/20 focus:border-warning',
  danger: 'bg-default/20 focus:border-danger'
}

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
      :for="computedId"
      class="mb-1 block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="computedId"
        ref="input"
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="
          cn(
            'block w-full rounded-md px-2 py-1 text-sm shadow-sm transition duration-150 ease-in-out focus:ring-1',
            className,
            colorClass[color],
            $slots.prefix && 'pl-10',
            $slots.suffix && 'pr-10',
            disabled && 'cursor-not-allowed bg-gray-100',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : ''
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

    <p v-if="helperText && !error" class="mt-1 text-sm text-gray-500">
      {{ helperText }}
    </p>

    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
