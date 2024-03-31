import type { UserAttributes } from './user'

export interface GalgameLink {
  // Essential features
  glid: number
  gid: number
  uid: number
  type: string
  link: string

  // Auto initialized features
  likes: number[]

  user: UserAttributes[]
}
