import type {
  TypeOptions,
  LanguageOptions,
  PlatformOptions
} from '~/components/galgame/utils/options'

export interface GalgameContributor {
  uid: number
  avatar: string
}

export interface GalgameDetail {
  gid: number
  vndbId: string
  user: KunUser
  name: KunLanguage
  banner: string
  introduction: KunLanguage
  markdown: KunLanguage
  time: number
  views: number
  platform: string[]
  language: string[]
  contributor: GalgameContributor[]
  likes: {
    count: number
    isLiked: boolean
  }
  favorites: {
    count: number
    isFavorite: boolean
  }
  alias: string[]
  official: string[]
  engine: string[]
  tags: string[]
  series: number[]
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
  gid: number
  name: KunLanguage
  banner: string
  user: KunUser

  views: number
  likes: number
  time: number
  platform: string[]
  language: string[]
}
