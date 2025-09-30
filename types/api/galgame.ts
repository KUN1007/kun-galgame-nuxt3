import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'
import type { GalgameSeries } from './galgame-series'
import type { GalgameEngineItem } from './galgame-engine'
import type { GalgameOfficialItem } from './galgame-official'
import type { GalgameTagItem } from './galgame-tag'
import type { GalgamePageRatingCard } from './galgame-rating'

export interface GalgameDetailTag extends GalgameTagItem {
  spoilerLevel: number
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
  originalLanguage: string
  ageLimit: 'all' | 'r18'
  platform: string[]
  language: string[]
  type: string[]
  contributor: KunUser[]
  likeCount: number
  isLiked: boolean
  favoriteCount: number
  isFavorited: boolean
  alias: string[]
  series: GalgameSeries | null
  engine: GalgameEngineItem[]
  official: GalgameOfficialItem[]
  tag: GalgameDetailTag[]
  ratings: GalgamePageRatingCard[]
  created: Date | string
  updated: Date | string
}

export interface GalgamePageRequestData {
  page: string
  limit: string
  type: KunGalgameResourceTypeOptions
  language: KunGalgameResourceLanguageOptions
  platform: KunGalgameResourcePlatformOptions
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
