import type { UserAttributes } from './user'

interface MessageRead {
  uid: number
  read_time: number
}

interface MessageReaction {
  uid: number
  reaction: string
}

export interface ChatMessageAttributes {
  cmid: number
  crid: number
  sender_uid: number
  content: string
  to_uid: number
  time: number
  status: 'pending' | 'sent' | 'read'
  is_recalled: boolean
  recalled_time: number
  read_by: MessageRead[]
  reactions: MessageReaction[]

  user: UserAttributes[]

  created: Date
  updated: Date
}
