export interface KunSelectOption {
  value: string | number
  label: string
}

export interface KunSelectProps {
  modelValue: string | number
  options: KunSelectOption[]
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  darkBorder?: boolean
  ariaLabel?: string
  className?: string
}
