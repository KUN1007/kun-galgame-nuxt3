import type { TopicUserInfo, TopicToUserInfo } from './topic'
import type { TopicComment } from './galgame-comment'

export interface TopicReplyRequestData {
  page: string
  limit: string
  sortOrder: KunOrder
}

export interface TopicReply {
  rid: number
  tid: number
  floor: number
  toFloor: number
  user: TopicUserInfo
  toUser: TopicToUserInfo
  edited: number
  content: string
  upvotes: {
    count: number
    isUpvoted: boolean
  }
  upvoteTime: number
  likes: {
    count: number
    isLiked: boolean
  }
  likes: {
    count: number
    isDisliked: boolean
  }
  tags: string[]
  time: number
  comment: TopicComment[]
}

export interface TopicCreateReplyRequestData {
  toUid: string
  toFloor: string
  tags: string[]
  content: string
  time: string
}

export interface TopicUpdateReplyRequestData {
  rid: string
  content: string
  tags: string[]
  edited: string
}
