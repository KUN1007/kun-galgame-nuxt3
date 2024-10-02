export interface ChatRoomAttributes {
  crid: number
  name: string
  type: 'private' | 'group'
  participants: number[]
  admins: number[]
  last_message_time: number

  created: Date
  updated: Date
}
