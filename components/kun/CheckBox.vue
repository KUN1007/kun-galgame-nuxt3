<script setup lang="ts">
import type { KunUIColor } from './ui/type'

interface Props {
  modelValue?: boolean
  color?: KunUIColor
  type?: 'single' | 'multiple'
  label?: string
  id?: string
  name?: string
  value?: string | number | boolean
  disabled?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  color: 'default',
  type: 'multiple',
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

const kunUniqueId = useKunUniqueId('kun-checkbox')
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}

const colorClasses: Record<KunUIColor, string> = {
  default:
    'border-default-300 checked:bg-default checked:border-default hover:border-default',
  primary:
    'border-primary-300 checked:bg-primary checked:border-primary hover:border-primary',
  secondary:
    'border-secondary-300 checked:bg-secondary checked:border-secondary hover:border-secondary',
  success:
    'border-success-300 checked:bg-success checked:border-success hover:border-success',
  warning:
    'border-warning-300 checked:bg-warning checked:border-warning hover:border-warning',
  danger:
    'border-danger-300 checked:bg-danger checked:border-danger hover:border-danger'
}
</script>

<template>
  <div :class="cn('flex cursor-pointer items-center', className)">
    <div class="relative flex items-center">
      <input
        type="checkbox"
        :id="kunUniqueId"
        :name="name"
        :value="value"
        :checked="modelValue"
        :disabled="disabled"
        :class="
          cn(
            'peer checked:bg-primary h-5 w-5 appearance-none border-2 text-white transition-all disabled:cursor-not-allowed disabled:opacity-50',
            props.type === 'single' ? 'rounded-full' : 'rounded',
            colorClasses[props.color]
          )
        "
        @change="updateValue"
      />
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
      >
        <KunIcon name="lucide:check" />
      </div>
    </div>
    <slot />
    <label
      v-if="label"
      :for="kunUniqueId"
      :class="
        cn(
          'text-default-700 ml-2 cursor-pointer text-sm select-none',
          disabled && 'cursor-not-allowed opacity-50'
        )
      "
    >
      {{ label }}
    </label>
  </div>
</template>
