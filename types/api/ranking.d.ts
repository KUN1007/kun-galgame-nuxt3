type TopicSortFieldRanking =
  | 'popularity'
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

export interface RankingGetTopicsRequestData {
  page: string
  limit: string
  sortField: TopicSortFieldRanking
  sortOrder: KunOrder
}

export interface RankingTopics {
  tid: number
  title: string
  field: number
}

export interface RankingGetUserRequestData {
  page: string
  limit: string
  sortField: UserSortFieldRanking
  sortOrder: KunOrder
}

export interface RankingUsers {
  uid: number
  name: string
  avatar: string
  field: number
}
