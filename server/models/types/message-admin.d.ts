import type { UserAttributes } from './user'

export type MessageStatus = 'read' | 'unread'

export interface MessageAttributes {
  maid: number
  uid: number
  time: number
  content: KunLanguage
  status: MessageStatus

  user: UserAttributes[]

  created: Date
  updated: Date
}
