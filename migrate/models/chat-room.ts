import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { ChatRoomAttributes } from './types/chat-room'

const ChatRoomSchema = new mongoose.Schema<ChatRoomAttributes>(
  {
    crid: { type: Number, unique: true },
    name: { type: String, default: '' },
    avatar: { type: String, default: '' },
    type: { type: String, required: true },
    participants: { type: [Number], required: true },
    admins: { type: [Number], default: [] },
    last_message: {
      content: { type: String, default: '' },
      time: { type: Number, default: 0 },
      sender_uid: { type: Number, default: 0 },
      sender_name: { type: String, default: '' }
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ChatRoomSchema.pre('save', increasingSequence('crid'))

const ChatRoomModel = mongoose.model('chat_room', ChatRoomSchema)

export default ChatRoomModel
