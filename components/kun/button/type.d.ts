import type {
  KunUIVariant,
  KunUIColor,
  KunUISize,
  KunUIRounded
} from '../ui/type'

export interface ButtonProps {
  variant?: KunUIVariant
  color?: KunUIColor
  size?: KunUISize
  rounded?: KunUIRounded
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  isIconOnly?: boolean
  icon?: boolean
  iconPosition?: 'left' | 'right'
  className?: string
  href?: string
}
