export type SortOrder = 'asc' | 'desc'

export type SortFieldRanking =
  | 'moemoepoint'
  | 'upvote'
  | 'like'
  | 'topic_count'
  | 'reply_count'
  | 'comment_count'

interface LoginUserResponseData {
  uid: number
  name: string
  avatar: string
  token: string
}

export interface LoginResponseData {
  data: LoginUserResponseData
  refreshToken: string
}
