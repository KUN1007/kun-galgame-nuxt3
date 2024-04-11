export type GalgameHistoryAction = 'created' | 'updated' | 'deleted'
export type GalgameHistoryType =
  | 'galgame'
  | 'name'
  | 'banner'
  | 'introduction'
  | 'link'
  | 'alias'
  | 'official'

interface User {
  uid: number
  name: string
  avatar: string
}

export interface CreateGalgameHistoryRequestData {
  gid: number
  uid: number
  time: number
  action: GalgameHistoryAction
  type: GalgameHistoryType
  content: string
}

export interface GalgameHistory {
  gid: number
  time: number
  action: GalgameHistoryAction
  type: GalgameHistoryType
  content: string

  user: User
}
