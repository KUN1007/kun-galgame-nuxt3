import type { UserAttributes } from './user'

export interface GalgameHistory {
  ghid: number
  gid: number
  uid: number
  time: number
  type: string
  note: string

  user: UserAttributes[]
}
