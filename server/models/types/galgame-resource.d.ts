import type { UserAttributes } from './user'

export interface GalgameResource {
  // Essential features
  grid: number
  gid: number
  uid: number
  type: string
  link: string[]
  language: string
  platform: string
  size: string

  // Auto initialized features
  code: string
  password: string
  note: string
  time: number
  status: number
  likes: number[]

  user: UserAttributes[]

  created: Date
  updated: Date
}
