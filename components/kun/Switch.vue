<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    disabled?: boolean
    className?: string
  }>(),
  { label: '', className: '', disabled: false }
)

const kunUniqueId = useKunUniqueId('kun-switch')

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div :class="cn('inline-flex items-center', className)">
    <label
      :for="kunUniqueId"
      class="relative inline-flex cursor-pointer items-center"
    >
      <input
        :id="kunUniqueId"
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        @change="
          (event) =>
            $emit(
              'update:modelValue',
              (event.target as HTMLInputElement).checked
            )
        "
        :disabled="disabled"
      />
      <div
        class="h-6 w-11 rounded-full transition-colors duration-200 ease-in-out"
        :class="[
          modelValue ? 'bg-primary-500' : 'bg-default-500',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          modelValue && disabled ? 'bg-primary-300' : ''
        ]"
      />
      <div
        class="absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
        :class="[
          modelValue ? 'translate-x-5' : 'translate-x-0',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        ]"
      />
    </label>
    <span
      v-if="label"
      class="ml-3 text-sm font-medium"
      :class="[disabled ? 'text-default-400' : '']"
    >
      {{ label }}
    </span>
  </div>
</template>
