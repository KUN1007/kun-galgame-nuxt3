import type { UserAttributes } from './userModel'

// 定义 Comment 文档的接口类型
export interface CommentAttributes {
  cid: number
  rid: number
  tid: number
  c_uid: number
  to_uid: number
  content: string

  likes_count: number
  dislikes_count: number

  likes: number[]
  dislikes: number[]
  // 虚拟字段
  cuid: UserAttributes[]
  touid: UserAttributes[]
}
