import type { UserAttributes } from './user'

export interface Galgame {
  gid: number
  vndb_id: string
  uid: number
  name: KunLanguage
  banner: string
  introduction: KunLanguage

  time: number
  status: number
  views: number
  type: string[]
  language: string[]
  platform: string[]
  contributor: number[]
  likes: number[]
  favorites: number[]

  resources: number[]
  links: number[]
  histories: number[]
  comments: number[]

  alias: string[]
  official: string[]
  engine: string[]

  user: UserAttributes[]

  created: Date
  updated: Date
}
