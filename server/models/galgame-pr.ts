import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { GalgamePR } from './types/galgame-pr'

const GalgamePRSchema = new mongoose.Schema<GalgamePR>(
  {
    gprid: { type: Number, unique: true },
    gid: { type: Number, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    status: { type: Number, default: 0 },
    galgame: {}
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgamePRSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

GalgamePRSchema.pre('save', increasingSequence('gprid'))

const GalgamePRModel = mongoose.model<GalgamePR>('galgame_pr', GalgamePRSchema)

export default GalgamePRModel
