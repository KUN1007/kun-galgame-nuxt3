import type { Language } from './language'
import type { UserAttributes } from './user'

export interface Galgame {
  // Essential features
  // Note that the languages must have least one
  gid: number
  vndb_id: number
  uid: number
  name: Language
  banner: string
  introduction: Language
  platform: string[]

  // Auto initialized features
  time: number
  status: number
  views: number
  editor: number[]
  likes: number[]
  favorites: number[]

  comments_count: number
  editor_count: number
  likes_count: number
  favorites_count: number

  // Some todo features
  alias: string[]
  official: string

  user: UserAttributes[]
}
