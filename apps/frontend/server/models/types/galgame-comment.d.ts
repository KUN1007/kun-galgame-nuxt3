import type { UserAttributes } from './user'

export interface GalgameComment {
  gcid: number
  gid: number
  c_uid: number
  to_uid: number
  content: string

  likes: number[]

  cuid: UserAttributes[]
  touid?: UserAttributes[]

  created: Date
  updated: Date
}
