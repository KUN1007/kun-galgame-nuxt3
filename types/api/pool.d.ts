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

export interface PoolTopic {
  tid: number
  title: string
  views: number
  likesCount: number
  time: number
  content: string
}

export interface PoolTopicsRequestData {
  page: string
  limit: string
  sortField: string
  sortOrder: string
}
