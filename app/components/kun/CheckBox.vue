<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
  id?: string
  name?: string
  value?: string | number | boolean
  disabled?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: undefined,
  id: undefined,
  name: undefined,
  value: undefined,
  disabled: false,
  className: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<template>
  <div :class="cn('flex items-center', className)">
    <div class="relative flex items-center">
      <input
        type="checkbox"
        :id="id"
        :name="name"
        :value="value"
        :checked="modelValue"
        :disabled="disabled"
        class="peer focus:ring-primary checked:bg-primary checked:border-primary hover:border-primary border-default-300 h-5 w-5 appearance-none rounded border-2 text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
        @change="updateValue"
      />
      <div
        class="pointer-events-none absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
      >
        <Icon name="lucide:check" />
      </div>
    </div>
    <slot />
    <label
      v-if="label"
      :for="id"
      class="text-default-700 ml-2 cursor-pointer text-sm select-none"
      :class="{ 'cursor-not-allowed opacity-50': disabled }"
    >
      {{ label }}
    </label>
  </div>
</template>
