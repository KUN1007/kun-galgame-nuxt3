export type SortField =
  | 'updated'
  | 'time'
  | 'popularity'
  | 'views'
  | 'upvotes_count'
  | 'likes_count'
  | 'replies_count'
  | 'comments'

export type SortOrder = 'asc' | 'desc'

export type SortFieldRanking =
  | 'popularity'
  | 'views'
  | 'upvotes_count'
  | 'likes_count'
  | 'replies_count'
  | 'comments'

export type SortFieldPool = 'views' | 'likes_count' | 'time'

export type TypeToGet = 'time' | 'popularity'

export interface SearchTopic {
  tid: number
  title: string
  content: string
  category: string[]
}

export interface SearchTopicRequestData {
  keywords: string
  category: string[]
  page: string
  limit: string
  sortField: SortField
  sortOrder: SortOrder
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
  sortOrder: SortOrder
}

export interface HomeTopic {
  tid: number
  title: string
  views: number
  upvotesCount: number
  likesCount: number
  repliesCount: number
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
