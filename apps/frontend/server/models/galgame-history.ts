import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { GalgameHistory } from './types/galgame-history'

const GalgameHistorySchema = new mongoose.Schema<GalgameHistory>(
  {
    ghid: { type: Number, unique: true },
    gid: { type: Number, required: true },
    uid: { type: Number, required: true },
    time: { type: Number, default: 0 },
    action: { type: String, default: '' },
    type: { type: String, default: '' },
    content: { type: String, default: '', max: 1007 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgameHistorySchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

GalgameHistorySchema.pre('save', increasingSequence('ghid'))

const GalgameHistoryModel = mongoose.model<GalgameHistory>(
  'galgame_history',
  GalgameHistorySchema
)

export default GalgameHistoryModel
