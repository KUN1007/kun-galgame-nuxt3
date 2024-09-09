import type { GalgameResource } from './galgame-resource.d.ts'
import type { MessageType } from './message.d.ts'

export interface HomeMessage {
  uid: number
  name: string
  tid: number | undefined
  type: MessageType
  content: string
  time: number
}

export interface SearchResult {
  tid: number
  title: string
  content: string
}

export interface SearchRequestData {
  keywords: string
  type: 'topic' | 'galgame'
  language: Language
  page: string
  limit: string
  sortField: SortField
  sortOrder: KunOrder
}

export interface HomeUserStatus {
  moemoepoints: number
  isCheckIn: boolean
}

export interface HomePinnedTopic {
  tid: number
  title: string
  time: number
}

export interface HomeTopic {
  tid: number
  title: string
  views: number
  likes: number
  replies: number
  comments: number

  time: number
  tags: string[]
  section: string[]
  popularity: number
  user: Omit<KunUser, 'avatar'>
  status: number
  upvote_time: number
}

export interface HomeGalgame {
  gid: number
  name: KunLanguage
  time: number
  views: number
  contributors: KunUser[]
  languages: string[]
  platforms: string[]
}

export interface HomeGalgameResources extends GalgameResource {
  name: KunLanguage
  time: number
}
