import type {
  MessageRead,
  MessageReaction
} from '~/server/models/types/chat-message'

export interface MessageHistoryRequest {
  receiverUid: string
  page: string
  limit: string
}

export interface AsideItem {
  chatroomName: string
  content: string
  time: number
  count: number
  unreadCount: number
  route: string
  title: string
  avatar: string
}

export interface Message {
  cmid: number
  chatroomName: string
  sender: KunUser
  receiverUid: number
  content: string
  time: number
  status: string
  isRecalled: boolean
  recalledTime: number
  readBy: MessageRead[]
  reactions: MessageReaction[]
}
