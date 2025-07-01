export type KunTabItem = {
  textValue?: string
  icon?: string
  value: string
  disabled?: boolean
  href?: string
}

export type KunTabVariant = 'solid' | 'underlined'
export type KunTabColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
export type KunTabSize = 'sm' | 'md' | 'lg'
