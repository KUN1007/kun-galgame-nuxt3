import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { MessageAttributes } from './types/message-admin'

const MessageAdminSchema = new mongoose.Schema<MessageAttributes>(
  {
    maid: { type: Number, unique: true },
    uid: { type: Number, required: true },
    time: { type: Number, default: 0 },
    content: {
      'en-us': { type: String, default: '' },
      'ja-jp': { type: String, default: '' },
      'zh-cn': { type: String, default: '' },
      'zh-tw': { type: String, default: '' }
    },
    status: { type: String, default: 'unread' }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

MessageAdminSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

MessageAdminSchema.pre('save', increasingSequence('maid'))

const MessageAdminModel = mongoose.model<MessageAttributes>(
  'message_admin',
  MessageAdminSchema
)

export default MessageAdminModel
