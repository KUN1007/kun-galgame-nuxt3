import type { KunAvatarSize } from '../avatar/type'

export interface KunUserProps {
  user: KunUser
  size?: KunAvatarSize
  description?: string
  className?: string
  disableFloating?: boolean
  floatingPosition?: 'top' | 'bottom' | 'left' | 'right'
}
