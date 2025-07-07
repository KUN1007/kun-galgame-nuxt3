import type {
  TypeOptions,
  LanguageOptions,
  PlatformOptions
} from '~/components/galgame/utils/options'

export interface GalgameSeriesItem {
  id: number
  name_en_us: string
  name_ja_jp: string
  name_zh_cn: string
  name_zh_tw: string
  banner: string
}

export interface GalgameSeries {
  id: number
  name: string
  description: string
  galgame: GalgameSeriesItem[]
}

export interface GalgameDetail {
  id: number
  vndbId: string
  user: KunUser
  name: KunLanguage
  banner: string
  introduction: KunLanguage
  contentLimit: string
  markdown: KunLanguage
  resourceUpdateTime: Date | string
  view: number
  platform: string[]
  language: string[]
  type: string[]
  contributor: KunUser[]
  likeCount: number
  isLiked: boolean
  favoriteCount: number
  isFavorite: boolean
  alias: string[]
  official: string[]
  engine: string[]
  tags: string[]
  series: GalgameSeries | null
  created: Date | string
  updated: Date | string
}

export interface GalgamePageRequestData {
  page: string
  limit: string
  type: TypeOptions
  language: LanguageOptions
  platform: PlatformOptions
  sortField: 'time' | 'views'
  sortOrder: KunOrder
}

export interface GalgameCard {
  id: number
  name: KunLanguage
  banner: string
  user: KunUser
  contentLimit: string
  view: number
  likeCount: number
  platform: string[]
  language: string[]
  resourceUpdateTime: Date | string
}
