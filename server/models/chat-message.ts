import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { ChatMessageAttributes } from './types/chat-message'

const ChatMessageSchema = new mongoose.Schema<ChatMessageAttributes>(
  {
    cmid: { type: Number, unique: true },
    crid: { type: Number, required: true },
    sender_uid: { type: Number, required: true },
    receiver_uid: { type: Number, default: 0 },
    content: { type: String, default: '', maxlength: 1000 },
    time: { type: Number, default: () => Date.now() },
    status: { type: String, default: 'pending' },
    is_recalled: { type: Boolean, default: false },
    recalled_time: { type: Number },
    read_by: {
      type: [
        {
          uid: { type: Number, required: true },
          read_time: { type: Number, required: true }
        }
      ],
      default: []
    },

    reactions: {
      type: [
        {
          uid: { type: Number, required: true },
          reaction: { type: String, required: true }
        }
      ],
      default: []
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ChatMessageSchema.pre('save', increasingSequence('cmid'))

ChatMessageSchema.virtual('user', {
  ref: 'user',
  localField: 'sender_uid',
  foreignField: 'uid'
})

const ChatMessageModel = mongoose.model('chat_message', ChatMessageSchema)
export default ChatMessageModel
