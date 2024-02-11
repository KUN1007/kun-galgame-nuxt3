import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { MessageAttributes } from './types/message'

const MessageSchema = new mongoose.Schema<MessageAttributes>(
  {
    mid: { type: Number, unique: true },
    sender_uid: { type: Number, required: true, ref: 'user' },
    receiver_uid: { type: Number, required: true },
    time: { type: Number, default: 0 },
    tid: { type: Number },
    content: { type: String, default: '' },
    status: { type: String, default: 'unread' },
    type: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

MessageSchema.virtual('user', {
  ref: 'user',
  localField: 'sender_uid',
  foreignField: 'uid',
})

MessageSchema.pre('save', increasingSequence('mid'))

const MessageModel = mongoose.model<MessageAttributes>('message', MessageSchema)

export default MessageModel
