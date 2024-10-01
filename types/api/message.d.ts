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
  sender: KunUser
  receiverUid: number
  time: number
  tid: number
  gid: number
  content: string
  status: MessageStatus
  type: MessageType
}

export interface AsideItem {
  content: string
  time: number
  count: number
  unreadCount: number
}

export interface MessageAsideStatus {
  notice: AsideItem
  system: Omit<AsideItem, 'content'>
}
