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
  time: number
  views: number
  platform: string[]
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
  official: string
}

export interface GalgamePageRequestData {
  page: string
  limit: string
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
