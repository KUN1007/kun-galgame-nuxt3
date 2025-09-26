export type KunDatePickerMode = 'single' | 'range'

export interface KunDatePickerProps {
  modelValue?: string | null | [string | null, string | null]
  mode?: KunDatePickerMode
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  darkBorder?: boolean
  clearable?: boolean

  format?: string
  valueFormat?: string

  minDate?: string | Date
  maxDate?: string | Date

  isDateDisabled?: (date: Date) => boolean
  locale?: string
  weekdays?: string[]
  months?: string[]
}
