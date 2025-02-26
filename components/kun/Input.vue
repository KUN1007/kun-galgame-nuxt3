<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    type?: string
    placeholder?: string
    helperText?: string
    error?: string
    required?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'text',
    modelValue: '',
    label: '',
    placeholder: '',
    helperText: '',
    error: '',
    required: false,
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const input = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const stableId = useId()
const computedId = computed(() => `kun-input-${stableId}`)
const containerClass = computed(() => ['w-full'])

const inputClass = computed(() => [
  'block w-full rounded-md shadow-sm',
  'text-sm text-gray-900',
  'transition duration-150 ease-in-out',
  'focus:ring-2 focus:ring-opacity-50 focus:outline-none'
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

defineExpose({
  focus: () => input.value?.focus(),
  blur: () => input.value?.blur(),
  select: () => input.value?.select()
})
</script>

<template>
  <div :class="containerClass">
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
            inputClass,
            $slots.prefix && 'pl-10',
            $slots.suffix && 'pr-10',
            disabled && 'cursor-not-allowed bg-gray-100',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'focus:border-primary-500 focus:ring-primary-500 border-gray-300'
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
