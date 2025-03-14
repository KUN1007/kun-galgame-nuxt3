import type { KunTabItem } from '~/components/kun/tab/type'

export const REFERENCE_SITE_MAP: Record<string, string> = {
  vndb: 'VNDB',
  erogamescape: '批评空间',
  dlsite: 'DLsite',
  wikipedia: '维基百科'
}

export const languageItems: KunTabItem[] = [
  {
    textValue: '简体中文',
    value: 'zh-cn'
  },
  {
    textValue: '日语',
    value: 'ja-jp'
  },
  {
    textValue: '繁体中文',
    value: 'zh-tw'
  },
  {
    textValue: '英语',
    value: 'en-us'
  }
]
