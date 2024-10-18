import type { HomeTopic, HomeGalgame } from './home'

export type SortField =
  | 'updated'
  | 'time'
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

export type SortFieldPool = 'views' | 'created'

export type PoolTopic = HomeTopic

export interface PoolTopicsRequestData {
  page: string
  limit: string
  sortField: string
  sortOrder: string
  category: string
}
