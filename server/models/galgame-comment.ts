import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { GalgameComment } from './types/galgame-comment'

const GalgameCommentSchema = new mongoose.Schema<GalgameComment>(
  {
    gcid: { type: Number, unique: true },
    gid: { type: Number, required: true },
    c_uid: { type: Number, required: true, ref: 'user' },
    to_uid: { type: Number, required: true, ref: 'user' },
    content: { type: String, default: '' },

    likes: { type: [Number], default: [] },
    likes_count: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgameCommentSchema.virtual('cuid', {
  ref: 'user',
  localField: 'c_uid',
  foreignField: 'uid'
})

GalgameCommentSchema.virtual('touid', {
  ref: 'user',
  localField: 'to_uid',
  foreignField: 'uid'
})

GalgameCommentSchema.pre('save', increasingSequence('gcid'))

const GalgameCommentModel = mongoose.model<GalgameComment>(
  'galgame_comment',
  GalgameCommentSchema
)

export default GalgameCommentModel
