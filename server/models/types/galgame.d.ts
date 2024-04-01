import { KunLanguage } from '~/types/i18n'
import type { UserAttributes } from './user'

export interface Galgame {
  // Essential features
  // Note that the languages must have least one
  gid: number
  vndb_id: number
  uid: number
  name: KunLanguage
  banner: string
  introduction: KunLanguage
  platform: string[]

  // Auto initialized features
  time: number
  status: number
  views: number
  contributor: number[]
  likes: number[]
  favorites: number[]

  comments_count: number
  contributor_count: number
  likes_count: number
  favorites_count: number

  // Some todo features
  alias: string[]
  official: string

  user: UserAttributes[]
}
