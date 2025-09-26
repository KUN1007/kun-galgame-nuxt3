import { ref, computed, type Ref } from 'vue'
import {
  format,
  parseISO,
  isValid,
  addMonths,
  addYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
  startOfToday
} from 'date-fns'
import { enUS, ja, zhCN } from 'date-fns/locale'

const DEFAULT_FORMAT = 'yyyy-MM-dd'

const formatDate = (date: Date, formatStr = DEFAULT_FORMAT): string => {
  return format(date, formatStr)
}

const parseDate = (
  dateString: string | Date | null | undefined
): Date | null => {
  if (!dateString) return null
  if (dateString instanceof Date) {
    return isValid(dateString) ? dateString : null
  }
  const d = parseISO(dateString)
  return isValid(d) ? d : null
}

const getLocale = (localeStr?: string) => {
  switch (localeStr) {
    case 'ja':
      return ja
    case 'zh-CN':
      return zhCN
    default:
      return enUS
  }
}

export const useCalendar = (props: {
  modelValue: Ref<string | null | [string | null, string | null]>
  mode: Ref<'single' | 'range'>
  minDate?: Ref<string | Date | undefined>
  maxDate?: Ref<string | Date | undefined>
  isDateDisabled?: Ref<((date: Date) => boolean) | undefined>
  locale?: Ref<string | undefined> | string
  weekdays?: Ref<string[] | undefined>
  months?: Ref<string[] | undefined>
  valueFormat?: Ref<string | undefined>
}) => {
  const initialDate = Array.isArray(props.modelValue.value)
    ? props.modelValue.value[0]
    : props.modelValue.value
  const viewingDate = ref(parseDate(initialDate) || startOfToday())
  const tempRangeStart = ref<Date | null>(null)

  const localeObject = computed(() =>
    getLocale(
      typeof props.locale === 'string' ? props.locale : props.locale?.value
    )
  )

  const i18n = computed(() => {
    const locale = localeObject.value
    const weekdaysOverride =
      props.weekdays && 'value' in props.weekdays
        ? props.weekdays.value
        : props.weekdays
    const monthsOverride =
      props.months && 'value' in props.months
        ? props.months.value
        : props.months

    const weekdaysShort =
      weekdaysOverride ||
      [...Array(7)].map((_, i) =>
        format(new Date(2023, 0, i + 1), 'EEEEEE', { locale })
      )
    const months =
      monthsOverride ||
      [...Array(12)].map((_, i) =>
        format(new Date(2023, i, 1), 'LLLL', { locale })
      )

    return { weekdays: weekdaysShort, months }
  })

  const navigateMonth = (direction: number) => {
    viewingDate.value = addMonths(viewingDate.value, direction)
  }

  const navigateYear = (direction: number) => {
    viewingDate.value = addYears(viewingDate.value, direction)
  }

  const calendarGrid = computed(() => {
    const firstDayOfMonth = startOfMonth(viewingDate.value)
    const lastDayOfMonth = endOfMonth(viewingDate.value)

    const startDate = startOfWeek(firstDayOfMonth)
    const endDate = endOfWeek(lastDayOfMonth)

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    const minDateParsed = parseDate(props.minDate?.value)
    const maxDateParsed = parseDate(props.maxDate?.value)

    const min = startOfDay(minDateParsed || new Date(0))
    const max = startOfDay(maxDateParsed || new Date(8640000000000000))

    const modelValueDate = startOfDay(
      parseDate(
        Array.isArray(props.modelValue.value)
          ? props.modelValue.value[0]
          : (props.modelValue.value as string)
      ) || new Date(0)
    )
    const rangeStart = startOfDay(
      parseDate(
        Array.isArray(props.modelValue.value) ? props.modelValue.value[0] : null
      ) || new Date(0)
    )
    const rangeEnd = startOfDay(
      parseDate(
        Array.isArray(props.modelValue.value) ? props.modelValue.value[1] : null
      ) || new Date(0)
    )

    return days.map((date) => {
      const isSelected =
        props.mode.value === 'single'
          ? isSameDay(date, modelValueDate)
          : isSameDay(date, rangeStart) || isSameDay(date, rangeEnd)

      const isInRange =
        rangeStart &&
        rangeEnd &&
        isAfter(date, rangeStart) &&
        isBefore(date, rangeEnd)

      const isDisabledByProp = props.isDateDisabled?.value
        ? props.isDateDisabled.value(date)
        : false
      const isDisabled =
        isBefore(date, min) || isAfter(date, max) || isDisabledByProp

      return {
        date,
        key: formatDate(date),
        dayOfMonth: date.getDate(),
        isCurrentMonth: isSameMonth(date, viewingDate.value),
        isToday: isToday(date),
        isSelected,
        isRangeStart: isSameDay(date, rangeStart),
        isRangeEnd: isSameDay(date, rangeEnd),
        isInRange,
        isDisabled
      }
    })
  })

  const formatValue = (date: Date) => {
    const vf =
      props.valueFormat && 'value' in props.valueFormat
        ? props.valueFormat.value
        : props.valueFormat
    return format(date, vf || DEFAULT_FORMAT)
  }

  const selectDate = (
    date: Date
  ): [string | null, string | null] | string | null => {
    if (props.mode.value === 'single') {
      return formatValue(date)
    } else {
      if (
        !tempRangeStart.value ||
        (Array.isArray(props.modelValue.value) && props.modelValue.value[1])
      ) {
        tempRangeStart.value = date
        return [formatValue(date), null]
      } else {
        const start = tempRangeStart.value
        tempRangeStart.value = null
        if (!start) {
          return [formatValue(date), null]
        }
        if (isBefore(date, start)) {
          return [formatValue(date), formatValue(start)]
        }
        return [formatValue(start), formatValue(date)]
      }
    }
  }

  return {
    viewingDate,
    i18n,
    calendarGrid,
    navigateMonth,
    navigateYear,
    selectDate,
    formatDate,
    tempRangeStart
  }
}
