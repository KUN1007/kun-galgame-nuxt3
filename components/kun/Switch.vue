<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    disabled?: boolean
  }>(),
  { label: '', disabled: false }
)

const stableId = useId()
const computedId = computed(() => `kun-switch-${stableId}`)

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div class="inline-flex items-center">
    <label
      :for="computedId"
      class="relative inline-flex cursor-pointer items-center"
    >
      <input
        :id="computedId"
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
          modelValue ? 'bg-primary-600' : 'bg-gray-200',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          modelValue && disabled ? 'bg-primary-400' : ''
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
      :class="[disabled ? 'text-gray-400' : 'text-gray-900']"
    >
      {{ label }}
    </span>
  </div>
</template>
