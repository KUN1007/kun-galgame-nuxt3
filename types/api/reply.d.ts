import { TopicUserInfo, TopicToUserInfo } from './topic'

export interface TopicReplyRequestData {
  tid: number
  page?: number
  limit?: number
  sortField: string
  sortOrder: string
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
  tid: number
  to_uid: number
  to_floor: number
  tags: string[]
  content: string
  time: number
}

export interface TopicUpvoteReplyRequestData {
  tid: number
  to_uid: number
  rid: number
  time: number
}

export interface TopicLikeReplyRequestData {
  tid: number
  to_uid: number
  rid: number
  isPush: boolean
}

export interface TopicDislikeReplyRequestData {
  tid: number
  to_uid: number
  rid: number
  isPush: boolean
}

export interface TopicUpdateReplyRequestData {
  tid: number
  rid: number
  content: string
  tags: string[]
  edited: number
}
