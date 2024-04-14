import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { ReplyAttributes } from './types/reply'

const ReplySchema = new mongoose.Schema<ReplyAttributes>(
  {
    rid: { type: Number, unique: true },
    tid: { type: Number, required: true },
    r_uid: { type: Number, required: true },
    to_uid: { type: Number, required: true },
    floor: { type: Number, default: 0 },
    to_floor: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    time: { type: Number, default: 0 },
    edited: { type: Number, default: 0 },
    content: { type: String, default: '' },
    upvote_time: { type: Number, default: 0 },

    upvotes: { type: [Number], default: [] },
    likes: { type: [Number], default: [] },
    dislikes: { type: [Number], default: [] },
    share: { type: [Number], default: [] },
    comment: { type: [String], default: [] }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ReplySchema.virtual('r_user', {
  ref: 'user',
  localField: 'r_uid',
  foreignField: 'uid'
})

ReplySchema.virtual('to_user', {
  ref: 'user',
  localField: 'to_uid',
  foreignField: 'uid'
})

ReplySchema.pre('save', increasingSequence('rid'))

const ReplyModel = mongoose.model<ReplyAttributes>('reply', ReplySchema)

export default ReplyModel
