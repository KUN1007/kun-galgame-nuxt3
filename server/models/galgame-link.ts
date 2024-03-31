import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { GalgameLink } from './types/galgame-link'

const GalgameLinkSchema = new mongoose.Schema<GalgameLink>(
  {
    glid: { type: Number, unique: true },
    gid: { type: Number, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    type: { type: String, default: '' },
    link: { type: String, default: '' },

    likes: { type: [Number], default: [] }
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
