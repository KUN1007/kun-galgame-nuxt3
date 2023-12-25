import { TopicUserInfo, TopicToUserInfo } from './topic'

export interface TopicComment {
  cid: number
  rid: number
  tid: number
  c_user: Omit<TopicUserInfo, 'moemoepoint'>
  to_user: TopicToUserInfo
  content: string
  likes: number[]
  dislikes: number[]
}

export interface TopicLikeCommentRequestData {
  cid: string
  to_uid: string
}

export interface TopicDislikeCommentRequestData {
  cid: string
  to_uid: string
}

export interface TopicCreateCommentRequestData {
  rid: string
  to_uid: string
  content: string
}
