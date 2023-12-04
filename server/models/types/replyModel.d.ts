import type { UserAttributes } from './userModel'

// 回复
export interface ReplyAttributes {
  rid: number
  tid: number
  r_uid: number
  to_uid: number
  floor: number
  to_floor: number
  tags: string[]
  time: number
  edited: number
  content: string
  upvote_time: number

  likes_count: number
  comments_count: number

  upvotes: number[]
  likes: number[]
  dislikes: number[]
  share: number[]
  comment: number[]
  // 虚拟字段
  r_user: UserAttributes[]
  to_user: UserAttributes[]
}
