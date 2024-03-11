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
  user: {
    uid: number
    avatar: string
    name: string
  }
  views: number
  category: string[]
  tags: string[]
  likesCount: number
  replies: number
  comments: number
  time: number
}

export interface PoolTopicsRequestData {
  page: string
  limit: string
  sortField: string
  sortOrder: string
}
