export type SortField =
  | 'updated'
  | 'time'
  | 'popularity'
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

export type SortFieldRanking =
  | 'popularity'
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

export type SortFieldPool = 'views' | 'likes' | 'time'

export type TypeToGet = 'time' | 'popularity'

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

interface HomeUserInfo {
  uid: number
  avatar: string
  name: string
}

export interface HomeNavTopic {
  tid: number
  title: string
  time: number
  popularity: number
}

export interface HomeTopicRequestData {
  category: string
  page: string
  limit: string
  sortField: SortField
  sortOrder: KunOrder
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
  upvotes: number
  likes: number
  replies: number
  comments: number

  time: number
  content: string
  tags: string[]
  section: string[]
  popularity: number
  user: HomeUserInfo
  status: number
  upvote_time: number
}
