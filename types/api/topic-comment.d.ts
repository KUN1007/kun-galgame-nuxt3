import { TopicUserInfo, TopicToUserInfo } from './topic'

export interface TopicComment {
  cid: number
  rid: number
  tid: number
  cUser: Omit<TopicUserInfo, 'moemoepoint'>
  toUser: Omit<KunUser, 'avatar'>
  content: string
  likes: number[]
}

export interface TopicLikeCommentRequestData {
  cid: string
  toUid: string
}

export interface TopicCreateCommentRequestData {
  rid: string
  toUid: string
  content: string
}
