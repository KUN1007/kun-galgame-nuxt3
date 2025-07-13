import type { UserAttributes } from './user'
import type { TopicAttributes } from './topic'

export interface CommentAttributes {
  cid: number
  rid: number
  tid: number
  c_uid: number
  to_uid: number
  content: string

  likes: number[]

  topic: TopicAttributes[]
  cuid: UserAttributes[]
  touid: UserAttributes[]

  created: Date
  updated: Date
}
