export type MessageType =
  | 'upvoted'
  | 'liked'
  | 'favorite'
  | 'replied'
  | 'solution'
  | 'pin-reply'
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
  id: number
  sender: KunUser
  receiverUid: number
  link: string
  content: string
  status: MessageStatus
  type: MessageType
  created: Date | string
}

export interface SystemMessage {
  id: number
  status: MessageStatus
  content: KunNullable<KunLanguage>
  admin: KunUser
  created: Date | string
}
