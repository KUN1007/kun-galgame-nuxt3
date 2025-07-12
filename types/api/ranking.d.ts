type TopicSortFieldRanking =
  | 'views'
  | 'upvotes'
  | 'likes'
  | 'replies'
  | 'comments'

type UserSortFieldRanking =
  | 'moemoepoint'
  | 'upvote'
  | 'like'
  | 'topic'
  | 'reply'
  | 'comment'

type GalgameSortFieldRanking =
  | 'view'
  | 'like'
  | 'favorite'
  | 'resource'
  | 'created'

export interface UserRankingItem {
  id: number
  name: string
  avatar: string
  bio: string
  sortField: string
  value: number
}

export interface TopicRankingItem {
  id: number
  title: string
  user: KunUser
  sortField: string
  value: number
}

export interface GalgameRankingItem {
  id: number
  name: KunLanguage
  user: KunUser
  banner: string
  sortField: string
  value: number
}
