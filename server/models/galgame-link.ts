import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { GalgameLink } from './types/galgame-link'

const GalgameLinkSchema = new mongoose.Schema<GalgameLink>(
  {
    gid: { type: Number, required: true },
    glid: { type: Number, unique: true },
    uid: { type: Number, required: true, ref: 'user' },
    name: { type: String, default: '' },
    link: { type: String, default: '' }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgameLinkSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

GalgameLinkSchema.pre('save', increasingSequence('glid'))

const GalgameLinkModel = mongoose.model<GalgameLink>(
  'galgame_link',
  GalgameLinkSchema
)

export default GalgameLinkModel
