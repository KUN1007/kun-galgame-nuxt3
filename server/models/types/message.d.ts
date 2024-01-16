import type { MessageStatus, MessageType } from '~/types/api/message'

export interface MessageAttributes {
  mid: number
  sender_uid: number
  receiver_uid: number
  time: number
  tid?: number
  content: string
  status: MessageStatus
  type: MessageType
}
