import type { KunUIColor, KunUISize } from '../ui/type'

export interface KunLinkProps {
  tag?: 'a' | 'NuxtLink'
  href?: string
  to?: string | Record<string, string>
  color?: KunUIColor
  underline?: 'none' | 'hover' | 'always'
  size?: KunUISize
  className?: string
  rel?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  isShowAnchorIcon?: boolean
}
