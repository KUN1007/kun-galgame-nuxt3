import { KunLanguageBack } from '~/types/i18n'
import type { UserAttributes } from './user'

export interface Galgame {
  // Essential features
  // Note that the languages must have least one
  gid: number
  vndb_id: number
  uid: number
  name: KunLanguageBack
  banner: string
  introduction: KunLanguageBack
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
