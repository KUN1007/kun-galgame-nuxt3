import type { UserAttributes } from './user'

export interface Galgame {
  gid: number
  vndb_id: string
  uid: number
  name: KunLanguage
  banner: string
  introduction: KunLanguage
  content_limit: string

  time: number
  status: number
  views: number
  type: string[]
  language: string[]
  platform: string[]
  contributor: number[]
  likes: number[]
  favorites: number[]

  series: number[]
  resources: number[]
  links: number[]
  histories: number[]
  comments: number[]

  alias: string[]
  official: string[]
  engine: string[]
  tags: string[]

  user: UserAttributes[]

  created: Date
  updated: Date
}
