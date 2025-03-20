import type { KunTabItem } from '~/components/kun/tab/type'

interface ReferenceSite {
  url: string
  name: string
  label: string
}

export const referenceSiteList: ReferenceSite[] = [
  {
    url: 'https://vndb.org/',
    name: 'vndb',
    label: 'VNDB'
  },
  {
    url: 'https://erogamescape.dyndns.org/',
    name: 'erogamescape',
    label: '批评空间'
  },
  {
    url: 'https://www.dlsite.com/pro/',
    name: 'dlsite',
    label: 'DLsite'
  },
  {
    url: 'https://www.wikipedia.org/',
    name: 'wikipedia',
    label: '维基百科'
  }
]

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
