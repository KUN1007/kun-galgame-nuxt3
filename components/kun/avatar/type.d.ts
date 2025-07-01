import type { KunUISize } from '~/components/kun/ui/type'

export interface KunAvatarProps {
  user: KunUser
  size?: KunUISize | 'original' | 'original-sm'
  isNavigation?: boolean
  className?: string
}
