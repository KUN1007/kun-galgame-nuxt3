import type { UserAttributes } from './user'
import type { TopicAttributes } from './topic'

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

  upvotes: number[]
  likes: number[]
  dislikes: number[]
  share: number[]
  comment: number[]

  topic: TopicAttributes[]
  r_user: UserAttributes[]
  to_user: UserAttributes[]

  created: Date
  updated: Date
}
