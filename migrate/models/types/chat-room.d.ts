interface LastMessage {
  sender_uid: number
  sender_name: string
  content: string
  time: number
}

export interface ChatRoomAttributes {
  crid: number
  name: string
  type: 'private' | 'group'
  avatar: string
  participants: number[]
  admins: number[]
  last_message: LastMessage

  created: Date
  updated: Date
}
