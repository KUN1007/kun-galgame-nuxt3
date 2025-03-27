import type { KunUISize } from '~/components/kun/ui/type'

export interface KunAvatarProps {
  user: KunUser
  size?: KunUISize | 'original'
  isNavigation?: boolean
  className?: string
}
