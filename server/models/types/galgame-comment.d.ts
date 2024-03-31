import type { UserAttributes } from './user'

export interface GalgameComment {
  gcid: number
  gid: number
  c_uid: number
  to_uid: number
  content: string

  likes: number[]
  likes_count: number

  cuid: UserAttributes[]
  touid: UserAttributes[]
}
