import type { KunLanguage } from '../i18n'

export interface GalgameUserInfo {
  uid: number
  name: string
  avatar: string
}

export interface GalgameDetail {
  gid: number
  vndbId: string
  user: GalgameUserInfo
  name: KunLanguage
  banner: string
  introduction: KunLanguage
  time: number
  views: number
  platform: string[]
  contributor: Omit<GalgameUserInfo, 'name'>[]
  likes: number
  favorites: number
  alias: string[]
  official: string
}
