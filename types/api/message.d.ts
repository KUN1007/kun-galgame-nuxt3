export type MessageType =
  | 'upvoted'
  | 'liked'
  | 'favorite'
  | 'replied'
  | 'commented'
  | 'expired'
  | 'requested'
  | 'merged'
  | 'declined'
  | 'mentioned'
  | 'admin'

export type MessageStatus = 'read' | 'unread'

export type SortField = 'time'

export interface MessageRequestData {
  page: string
  limit: string
  type?: MessageType | ''
  sortField?: SortField
  sortOrder: KunOrder
}

export interface Message {
  mid: number
  senderUid: number
  senderName: string
  receiverUid: number
  time: number
  tid?: number
  status: MessageStatus
  type: MessageType
}

export interface HomeMessage {
  uid: number
  name: string
  tid: number | undefined
  type: MessageType
  content: string
  time: number
}
