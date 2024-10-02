import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { ChatRoomAttributes } from './types/chat-room'

const ChatRoomSchema = new mongoose.Schema<ChatRoomAttributes>(
  {
    crid: { type: Number, unique: true },
    name: { type: String, default: '' },
    type: { type: String, required: true },
    participants: { type: [Number], required: true },
    admins: { type: [Number], default: [] },
    last_message_time: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ChatRoomSchema.pre('save', increasingSequence('crid'))

const ChatRoomModel = mongoose.model('chat_room', ChatRoomSchema)

export default ChatRoomModel
