<script setup lang="ts">
import type { KunSelectProps } from './type'
import {
  useElementBounding,
  useEventListener,
  useWindowSize,
  onClickOutside
} from '@vueuse/core'

const props = withDefaults(defineProps<KunSelectProps>(), {
  placeholder: '',
  label: '',
  disabled: false,
  error: '',
  darkBorder: true,
  ariaLabel: '',
  className: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  set: [value: string | number, index: number]
}>()

const kunUniqueId = useKunUniqueId('kun-select')
const isOpen = ref(false)
const showAbove = ref(false)
const button = useTemplateRef<HTMLElement>('button')
const dropdown = useTemplateRef<HTMLElement>('dropdown')

const buttonBounds = useElementBounding(button)
const dropdownBounds = useElementBounding(dropdown)
const { height: windowHeight } = useWindowSize()
onClickOutside(button, () => {
  isOpen.value = false
})

const selectedLabel = computed(() => {
  const selected = props.options.find(
    (option) => option.value === props.modelValue
  )
  return selected?.label
})

const updateDropdownPosition = () => {
  if (!button.value || !dropdown.value) {
    return
  }

  const spaceBelow = windowHeight.value - buttonBounds.bottom.value
  const spaceAbove = buttonBounds.top.value
  const requiredSpace = dropdownBounds.height.value + 8

  showAbove.value = spaceBelow < requiredSpace && spaceAbove > requiredSpace
}

useEventListener(document, 'click', (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest(`#${kunUniqueId.value}`)) {
    isOpen.value = false
  }
})

watch([isOpen, dropdownBounds.height], () => {
  if (isOpen.value) {
    nextTick(updateDropdownPosition)
  }
})

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (value: string | number, index: number) => {
  emit('update:modelValue', value)
  emit('set', value, index)
  isOpen.value = false
}
</script>

<template>
  <div :class="cn('relative w-full', props.className)">
    <label
      v-if="label"
      :for="kunUniqueId"
      class="mb-2 block text-sm font-medium"
    >
      {{ label }}
    </label>

    <button
      ref="button"
      :id="kunUniqueId"
      type="button"
      :aria-label="props.ariaLabel || 'select'"
      :class="
        cn(
          'focus:border-primary-500 focus:ring-primary-500 flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm focus:ring-1 focus:outline-none',
          darkBorder && 'dark:border-default-200 border-default/20 border',
          disabled && 'bg-default-100 cursor-cursor-not-allowed'
        )
      "
      @click="toggle"
      :disabled="disabled"
    >
      <span class="block truncate">
        {{ selectedLabel || placeholder }}
      </span>
      <KunIcon
        name="lucide:chevron-down"
        class="pointer-events-none"
        :class="
          cn('text-inherit transition-transform', isOpen ? 'rotate-180' : '')
        "
      />
    </button>

    <Transition :name="showAbove ? 'fadeDown' : 'fadeUp'">
      <div
        v-show="isOpen"
        ref="dropdown"
        class="absolute z-10 w-full rounded-md border bg-white p-1 dark:bg-black"
        :class="showAbove ? 'bottom-full mb-1' : 'top-full mt-1'"
      >
        <ul
          class="scrollbar-hide max-h-60 overflow-auto rounded-md text-base text-sm focus:outline-none"
          tabindex="-1"
          role="listbox"
        >
          <li
            v-for="(option, index) in options"
            :key="option.value"
            class="hover:bg-default-100 text-foreground relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 select-none"
            @click="selectOption(option.value, index)"
            role="option"
          >
            <span class="block truncate">
              {{ option.label }}
            </span>

            <KunIcon
              v-if="modelValue === option.value"
              class="flex items-center pr-4"
              name="lucide:check"
            />
          </li>
        </ul>
      </div>
    </Transition>

    <p v-if="error" class="text-danger mt-2 text-sm">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped>
.fadeUp-enter-active,
.fadeUp-leave-active,
.fadeDown-enter-active,
.fadeDown-leave-active {
  transition: all 0.2s ease-in-out;
}

.fadeUp-enter-from,
.fadeUp-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

.fadeDown-enter-from,
.fadeDown-leave-to {
  transform: translateY(8px);
  opacity: 0;
}
</style>
