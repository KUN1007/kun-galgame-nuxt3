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
  moemoepoint: number
  topicCount: number
  replyCount: number
  commentCount: number
  likeCount: number
  upvoteCount: number
  created: Date
}

export interface TopicRankingItem {
  id: number
  title: string
  view: number
  created: Date
  user: KunUser
  upvoteCount: number
  likeCount: number
  replyCount: number
  commentCount: number
}

export interface GalgameRankingItem {
  id: number
  name: KunLanguage
  banner: string
  view: number
  created: Date
  likeCount: number
  favoriteCount: number
  resourceCount: number
}
