export type MessageType =
  | 'upvoted'
  | 'liked'
  | 'replied'
  | 'commented'
  | 'mentioned'
  | 'admin'

export type RelatedContent = 'topic' | 'reply' | 'comment'

export type MessageStatus = 'read' | 'unread'

export type SortField = 'time'

export type SortOrder = 'asc' | 'desc'

export interface MessageRequestData {
  page: string
  limit: string
  type?: MessageType | ''
  sortField?: SortField
  sortOrder: SortOrder
}

export interface Message {
  mid: number
  senderUid: number
  senderName: string
  receiverUid: number
  time: number
  tid?: number
  content?: RelatedContent | string
  status: MessageStatus
  type: MessageType
}
