import type { KunUIColor, KunUISize } from '~/components/kun/ui/type'

export const KUN_DOC_CATEGORY_MAP: Record<string, string> = {
  galgame: 'Galgame',
  kun: '关于鲲',
  notice: '网站公告',
  other: '其它'
}

export const KUN_DOC_CATEGORY_COLOR_MAP: Record<string, KunUIColor> = {
  galgame: 'success',
  kun: 'secondary',
  notice: 'primary',
  other: 'default'
}
