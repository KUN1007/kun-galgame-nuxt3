import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { CommentAttributes } from './types/comment'

const CommentSchema = new mongoose.Schema<CommentAttributes>(
  {
    cid: { type: Number, unique: true },
    rid: { type: Number, required: true },
    tid: { type: Number, required: true },
    c_uid: { type: Number, required: true, ref: 'user' },
    to_uid: { type: Number, required: true, ref: 'user' },
    content: { type: String, default: '' },

    likes: { type: [Number], default: [] }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

CommentSchema.virtual('cuid', {
  ref: 'user',
  localField: 'c_uid',
  foreignField: 'uid'
})

CommentSchema.virtual('touid', {
  ref: 'user',
  localField: 'to_uid',
  foreignField: 'uid'
})

CommentSchema.pre('save', increasingSequence('cid'))

const CommentModel = mongoose.model<CommentAttributes>('comment', CommentSchema)

export default CommentModel
