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

export type MessageReadStatus = 'read' | 'unread'

export type MessageStatus = 'online' | 'offline' | 'new' | 'admin'

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
  sender: KunUser
  receiverUid: number
  time: number
  tid: number
  gid: number
  content: string
  status: MessageStatus
  type: MessageType
}
