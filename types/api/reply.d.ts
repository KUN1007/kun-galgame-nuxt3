import { TopicUserInfo, TopicToUserInfo } from './topic'

export interface TopicReplyRequestData {
  page: string
  limit: string
  sortOrder: KunOrder
}

export interface TopicReply {
  rid: number
  tid: number
  floor: number
  to_floor: number
  r_user: TopicUserInfo
  to_user: TopicToUserInfo
  edited: number
  content: string
  upvotes: number[]
  upvote_time: number
  likes: number[]
  dislikes: number[]
  tags: string[]
  time: number
  comment: number[]
}

export interface TopicCreateReplyRequestData {
  to_uid: string
  to_floor: string
  tags: string[]
  content: string
  time: string
}

export interface TopicUpvoteReplyRequestData {
  to_uid: string
  rid: string
  time: string
}

export interface TopicLikeReplyRequestData {
  to_uid: string
  rid: string
  isPush: string
}

export interface TopicDislikeReplyRequestData {
  to_uid: string
  rid: string
  isPush: string
}

export interface TopicUpdateReplyRequestData {
  rid: string
  content: string
  tags: string[]
  edited: string
}
