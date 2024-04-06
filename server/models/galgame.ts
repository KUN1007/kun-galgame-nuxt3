import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { Galgame } from './types/galgame'

const GalgameSchema = new mongoose.Schema<Galgame>(
  {
    gid: { type: Number, unique: true },
    vndb_id: { type: String, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    name: {
      'en-us': { type: String, default: '' },
      'ja-jp': { type: String, default: '' },
      'zh-cn': { type: String, default: '' }
    },
    banner: { type: String, default: '' },
    introduction: {
      'en-us': { type: String, default: '' },
      'ja-jp': { type: String, default: '' },
      'zh-cn': { type: String, default: '' }
    },

    time: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    platform: { type: [String], default: [] },
    contributor: { type: [Number], default: [] },
    likes: { type: [Number], default: [] },
    favorites: { type: [Number], default: [] },

    resources: { type: [Number], default: [] },
    links: { type: [Number], default: [] },
    histories: { type: [Number], default: [] },
    comments: { type: [Number], default: [] },

    alias: { type: [String], default: [] },
    official: { type: String, default: '' }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgameSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

GalgameSchema.pre('save', increasingSequence('gid'))

const GalgameModel = mongoose.model<Galgame>('galgame', GalgameSchema)

export default GalgameModel
