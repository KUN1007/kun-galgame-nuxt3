<script setup lang="ts">
import type { KunSelectProps } from './type'

const props = withDefaults(defineProps<KunSelectProps>(), {
  placeholder: '',
  label: '',
  disabled: false,
  error: ''
})

const emit = defineEmits<{
  set: [value: string | number, index: number]
}>()

const stableId = useId()
const computedId = computed(() => `kun-select-${stableId}`)
const isOpen = ref(false)
const selectedLabel = computed(() => {
  const selected = props.options.find(
    (option) => option.value === props.modelValue
  )
  return selected?.label
})

const closeOnClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest(`#${computedId.value}`)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (value: string | number, index: number) => {
  emit('set', value, index)
  isOpen.value = false
}
</script>

<template>
  <div class="relative w-full">
    <label
      v-if="label"
      :for="computedId"
      class="mb-2 block text-sm font-medium"
    >
      {{ label }}
    </label>

    <button
      :id="computedId"
      type="button"
      class="focus:border-primary-500 focus:ring-primary-500 flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left shadow focus:ring-1 focus:outline-none sm:text-sm"
      :class="{
        'border-default-300': !error,
        'border-danger-500': error,
        'bg-default-100': disabled
      }"
      @click="toggle"
      :disabled="disabled"
    >
      <span class="block truncate">
        {{ selectedLabel || placeholder }}
      </span>
      <Icon
        name="lucide:chevron-down"
        class="pointer-events-none"
        :class="
          cn('text-inherit transition-transform', isOpen ? 'rotate-180' : '')
        "
      />
    </button>

    <Transition name="fadeIn">
      <div
        v-show="isOpen"
        class="bg-background absolute z-10 mt-1 w-full rounded-md border p-1 shadow-lg"
      >
        <ul
          class="scrollbar-hide max-h-60 overflow-auto rounded-md text-base focus:outline-none sm:text-sm"
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

            <Icon
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
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.2s ease-in-out;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
