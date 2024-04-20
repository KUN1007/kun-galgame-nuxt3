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

export interface PoolTopic {
  tid: number
  title: string
  user: {
    uid: number
    avatar: string
    name: string
  }
  views: number
  section: string[]
  tags: string[]
  likes: number
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
