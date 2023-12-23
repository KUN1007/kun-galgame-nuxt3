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
  tid: number
  cid: number
  to_uid: number
}

export interface TopicDislikeCommentRequestData {
  tid: number
  cid: number
  to_uid: number
}

export interface TopicCreateCommentRequestData {
  tid: number
  rid: number
  to_uid: number
  content: string
}
