import { KunLanguage } from '~/types/i18n'
import type { UserAttributes } from './user'

export interface Galgame {
  // Essential features
  // Note that the languages must have least one
  gid: number
  vndb_id: string
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

  // Some todo features
  alias: string[]
  official: string

  user: UserAttributes[]
}
