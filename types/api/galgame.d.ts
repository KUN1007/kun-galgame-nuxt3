import type { KunGalgameTagCategory } from '~/constants/galgame'
import type {
  TypeOptions,
  LanguageOptions,
  PlatformOptions
} from '~/components/galgame/utils/options'
import type { GalgameSeries } from './series'

export interface GalgameSeriesItem {
  id: number
  name: KunLanguage
  banner: string
}

export interface GalgameEngine {
  id: number
  name: string
}

export interface GalgameEngineItem {
  id: number
  name: string
  alias: string[]
}

export interface GalgameEngineDetail {
  id: number
  name: string
  description: string
  alias: string[]
  galgame: GalgameCard[]
  galgameCount: number
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
  engine: GalgameEngine[]
  official: GalgameOfficial[]
  tag: GalgameTag[]
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
