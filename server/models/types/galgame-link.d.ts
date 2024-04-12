import type { UserAttributes } from './user'

export interface GalgameLink {
  // Essential features
  glid: number
  gid: number
  uid: number
  name: string
  link: string

  user: UserAttributes[]

  created: Date
  updated: Date
}
