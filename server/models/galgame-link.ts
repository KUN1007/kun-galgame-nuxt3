import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { GalgameLink } from './types/galgame-link'

const GalgameLinkSchema = new mongoose.Schema<GalgameLink>(
  {
    gid: { type: Number, required: true },
    glid: { type: Number, unique: true },
    uid: { type: Number, required: true },
    name: { type: String, default: '', maxlength: 107 },
    link: { type: String, default: '', maxlength: 233 }
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
