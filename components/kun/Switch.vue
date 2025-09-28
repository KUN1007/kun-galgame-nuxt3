<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    disabled?: boolean
    className?: string
    labelClassName?: string
  }>(),
  { label: '', className: '', disabled: false, labelClassName: '' }
)

const kunUniqueId = useKunUniqueId('kun-switch')

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label
    :class="
      cn(
        'inline-flex cursor-pointer items-center',
        disabled ? 'cursor-not-allowed' : '',
        className
      )
    "
  >
    <input
      :id="kunUniqueId"
      type="checkbox"
      class="peer sr-only"
      :checked="modelValue"
      @change="
        (event) =>
          $emit('update:modelValue', (event.target as HTMLInputElement).checked)
      "
      :disabled="disabled"
    />

    <div class="relative">
      <div
        class="h-6 w-11 rounded-full transition-colors duration-200 ease-in-out"
        :class="[
          modelValue ? 'bg-primary-500' : 'bg-default-500',
          disabled ? 'opacity-50' : '',
          modelValue && disabled ? 'bg-primary-300' : ''
        ]"
      />
      <div
        :class="
          cn(
            'absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out',
            modelValue ? 'translate-x-5' : 'translate-x-0'
          )
        "
      />
    </div>

    <span
      v-if="label"
      :class="
        cn(
          'ml-3 text-sm font-medium',
          disabled ? 'text-default-400' : '',
          labelClassName
        )
      "
    >
      {{ label }}
    </span>
  </label>
</template>
