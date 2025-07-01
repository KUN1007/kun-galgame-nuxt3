import type { KunUIColor } from '../ui/type'

export interface KunDividerProps {
  orientation?: 'horizontal' | 'vertical'
  color?: KunUIColor
  borderStyle?: 'solid' | 'dashed'
  className?: string
  withLabel?: boolean
}
