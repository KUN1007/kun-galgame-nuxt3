import type {
  RelatedContent,
  MessageStatus,
  MessageType,
} from '~/types/api/message'

export interface MessageAttributes {
  mid: number
  sender_uid: number
  receiver_uid: number
  time: number
  tid?: number
  content?: RelatedContent | string
  status: MessageStatus
  type: MessageType
}
