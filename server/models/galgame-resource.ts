import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { GalgameResource } from './types/galgame-resource'

const GalgameResourceSchema = new mongoose.Schema<GalgameResource>(
  {
    grid: { type: Number, unique: true },
    gid: { type: Number, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    type: { type: String, default: '' },
    link: { type: String, default: '' },
    language: { type: String, default: '' },
    platform: { type: String, default: '' },
    size: { type: String, default: '' },

    code: { type: String, default: '' },
    password: { type: String, default: '' },
    note: { type: String, default: '' },

    time: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    likes: { type: [Number], default: [] }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgameResourceSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

GalgameResourceSchema.pre('save', increasingSequence('grid'))

const GalgameResourceModel = mongoose.model<GalgameResource>(
  'galgame_resource',
  GalgameResourceSchema
)

export default GalgameResourceModel
