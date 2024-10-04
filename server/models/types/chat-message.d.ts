import type { UserAttributes } from './user'

export interface MessageRead {
  uid: number
  read_time: number
}

export interface MessageReaction {
  uid: number
  reaction: string
}

export interface ChatMessageAttributes {
  cmid: number
  chatroom_name: string
  sender_uid: number
  receiver_uid: number
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
