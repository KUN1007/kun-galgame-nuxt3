import type { UserAttributes } from './user'
import type { MessageReadStatus, MessageType } from '@/types/api/message'

export interface MessageAttributes {
  mid: number
  sender_uid: number
  receiver_uid: number
  time: number
  tid: number
  gid: number
  content: string
  status: MessageReadStatus
  type: MessageType

  user: UserAttributes[]

  created: Date
  updated: Date
}
