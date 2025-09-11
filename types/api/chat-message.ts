export interface MessageHistoryRequest {
  receiverUid: string
  page: string
  limit: string
}

export interface AsideItem {
  chatroomName: string
  content: string
  count: number
  unreadCount: number
  route: string
  title: string
  avatar: string
  lastMessageTime: Date | string
}

export interface ChatMessage {
  id: number
  chatroomName: string
  sender: KunUser
  readBy: KunUser[]
  receiverUid: number | null
  content: string
  isRecall: boolean
  created: Date | string
  recallTime: Date | string | null
  editTime: Date | string | null
}
