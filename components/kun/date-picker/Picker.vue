<script setup lang="ts">
import { ref, computed, toRefs, nextTick, watch } from 'vue'
import { onClickOutside, useElementBounding, useWindowSize } from '@vueuse/core'
import { useCalendar } from './useCalendar'
import type { KunDatePickerProps } from './types'

const props = withDefaults(defineProps<KunDatePickerProps>(), {
  modelValue: '',
  mode: 'single',
  label: '',
  placeholder: '请选择日期',
  error: '',
  disabled: false,
  darkBorder: true,
  clearable: true,
  format: 'yyyy-MM-dd',
  valueFormat: 'yyyy-MM-dd'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null | [string | null, string | null]]
}>()

const isOpen = ref(false)
const showAbove = ref(false)
const datePickerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const hoveredDate = ref<Date | null>(null)

onClickOutside(datePickerRef, () => (isOpen.value = false))
const {
  bottom: pickerBottom,
  top: pickerTop,
  width: pickerWidth
} = useElementBounding(datePickerRef)
const { height: dropdownHeight } = useElementBounding(dropdownRef)
const { height: windowHeight } = useWindowSize()

const updateDropdownPosition = () => {
  if (!datePickerRef.value || !dropdownRef.value) return
  const spaceBelow = windowHeight.value - pickerBottom.value
  const spaceAbove = pickerTop.value
  const requiredSpace = dropdownHeight.value + 8
  showAbove.value = spaceBelow < requiredSpace && spaceAbove > requiredSpace
}

const {
  modelValue,
  mode,
  minDate,
  maxDate,
  isDateDisabled,
  locale,
  weekdays,
  months,
  valueFormat
} = toRefs(props)
const {
  viewingDate,
  i18n,
  calendarGrid,
  navigateMonth,
  navigateYear,
  selectDate,
  formatDate,
  tempRangeStart
} = useCalendar({
  modelValue,
  mode,
  minDate,
  maxDate,
  isDateDisabled,
  locale,
  weekdays,
  months,
  valueFormat
})

const activeDate = ref<Date>(new Date(viewingDate.value))
watch(viewingDate, (val) => {
  activeDate.value = new Date(val)
})

const moveActiveDate = (days: number) => {
  const d = new Date(activeDate.value)
  d.setDate(d.getDate() + days)
  activeDate.value = d
  if (
    d.getMonth() !== viewingDate.value.getMonth() ||
    d.getFullYear() !== viewingDate.value.getFullYear()
  ) {
    viewingDate.value = new Date(d)
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      moveActiveDate(-1)
      break
    case 'ArrowRight':
      e.preventDefault()
      moveActiveDate(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      moveActiveDate(-7)
      break
    case 'ArrowDown':
      e.preventDefault()
      moveActiveDate(7)
      break
    case 'Enter':
      e.preventDefault()
      handleDateSelect(activeDate.value)
      break
    case 'Escape':
      e.preventDefault()
      isOpen.value = false
      break
  }
}

const displayValue = computed(() => {
  if (props.mode === 'single') {
    return props.modelValue
      ? formatDate(new Date(props.modelValue as string), props.format)
      : ''
  }
  if (Array.isArray(props.modelValue) && props.modelValue.every((d) => d)) {
    return `${formatDate(new Date(props.modelValue[0]!), props.format)} - ${formatDate(
      new Date(props.modelValue[1]!),
      props.format
    )}`
  }
  return ''
})

const toggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updateDropdownPosition()
      // focus so keyboard works
      datePickerRef.value?.focus()
    })
  }
}

const handleDateSelect = (date: Date) => {
  const newValue = selectDate(date)
  emit('update:modelValue', newValue)
  // close on single or when range is completed
  if (props.mode === 'single' || (Array.isArray(newValue) && newValue[1])) {
    isOpen.value = false
  }
}

const clearDate = () => {
  const newValue: string | null | [string | null, string | null] =
    props.mode === 'single' ? null : [null, null]
  emit('update:modelValue', newValue)
}

const isInPreviewRange = (date: Date) => {
  if (!tempRangeStart.value || !hoveredDate.value) return false
  const start = tempRangeStart.value
  const end = hoveredDate.value
  if (!start || !end) return false
  return (date > start && date < end) || (date < start && date > end)
}
</script>

<template>
  <div
    ref="datePickerRef"
    class="relative w-full"
    @keydown.prevent.capture="onKeydown"
    tabindex="0"
  >
    <label v-if="label" class="mb-2 block text-sm font-medium">
      {{ label }}
    </label>

    <div class="relative">
      <button
        type="button"
        @click="toggle"
        :disabled="disabled"
        :class="
          cn(
            'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left focus:ring-1 focus:outline-none sm:text-sm',
            'focus:border-primary-500 focus:ring-primary-500',
            darkBorder && 'dark:border-default-200 border-default-200 border',
            disabled && 'bg-default-100 cursor-not-allowed'
          )
        "
      >
        <span
          class="block truncate"
          :class="{ 'text-default-400': !displayValue }"
        >
          {{ displayValue || placeholder }}
        </span>
        <div class="flex items-center">
          <button
            v-if="clearable && displayValue"
            @click.stop="clearDate"
            class="text-default-500 hover:text-default-800 mr-2 p-1"
            aria-label="Clear date"
          >
            <KunIcon name="lucide:x" class="h-4 w-4" />
          </button>
          <KunIcon name="lucide:calendar" class="text-default-500" />
        </div>
      </button>
    </div>

    <Transition :name="showAbove ? 'fadeDown' : 'fadeUp'">
      <div
        v-show="isOpen"
        ref="dropdownRef"
        class="absolute z-50 rounded-md border bg-white p-3 dark:bg-black"
        :class="showAbove ? 'bottom-full mb-1' : 'top-full mt-1'"
        :style="{ minWidth: `${Math.max(260, Math.round(pickerWidth))}px` }"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <KunButton
              @click="navigateYear(-1)"
              variant="light"
              :is-icon-only="true"
              size="sm"
              aria-label="Previous year"
            >
              <KunIcon name="lucide:chevrons-left" />
            </KunButton>
            <KunButton
              @click="navigateMonth(-1)"
              variant="light"
              :is-icon-only="true"
              size="sm"
              aria-label="Previous month"
            >
              <KunIcon name="lucide:chevron-left" />
            </KunButton>
          </div>
          <div class="font-semibold">
            {{ viewingDate.getFullYear() }}
            /
            {{ viewingDate.getMonth() }}
          </div>
          <div class="flex items-center gap-2">
            <KunButton
              @click="navigateMonth(1)"
              variant="light"
              :is-icon-only="true"
              size="sm"
              aria-label="Next month"
            >
              <KunIcon name="lucide:chevron-right" />
            </KunButton>
            <KunButton
              @click="navigateYear(1)"
              variant="light"
              :is-icon-only="true"
              size="sm"
              aria-label="Next year"
            >
              <KunIcon name="lucide:chevrons-right" />
            </KunButton>
          </div>
        </div>

        <div class="text-default-600 mt-3 grid grid-cols-7 text-center text-xs">
          <div v-for="day in i18n.weekdays" :key="day" class="p-1 font-medium">
            {{ day }}
          </div>
        </div>

        <div class="mt-1 grid grid-cols-7" role="grid">
          <div
            v-for="day in calendarGrid"
            :key="day.key"
            class="p-0.5"
            role="gridcell"
          >
            <button
              @click="handleDateSelect(day.date)"
              @mouseenter="hoveredDate = day.date"
              @mouseleave="hoveredDate = null"
              :disabled="day.isDisabled"
              :class="
                cn(
                  'focus:ring-primary/40 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors focus:ring-2 focus:outline-none',
                  !day.isCurrentMonth && 'text-default-400',
                  day.isToday && 'border-primary bg-primary/20 border',
                  !day.isSelected && !day.isDisabled && 'hover:bg-default/20',
                  day.isDisabled && 'cursor-not-allowed opacity-50',
                  day.isSelected && 'bg-primary hover:bg-primary/90 text-white',
                  (day.isInRange || isInPreviewRange(day.date)) &&
                    !day.isSelected &&
                    'bg-primary/10 rounded-none',
                  day.isRangeStart && 'rounded-r-none',
                  day.isRangeEnd && 'rounded-l-none'
                )
              "
              :aria-label="day.date.toDateString()"
              :aria-selected="day.isSelected"
              :tabindex="
                day.date.toDateString() === activeDate.toDateString() ? 0 : -1
              "
            >
              {{ day.dayOfMonth }}
            </button>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-between">
          <KunButton
            size="sm"
            variant="light"
            @click="handleDateSelect(new Date())"
          >
            今天
          </KunButton>
          <div class="flex gap-2">
            <KunButton
              v-if="clearable"
              size="sm"
              variant="light"
              @click="clearDate"
            >
              清空
            </KunButton>
            <KunButton size="sm" variant="light" @click="isOpen = false">
              关闭
            </KunButton>
          </div>
        </div>
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
