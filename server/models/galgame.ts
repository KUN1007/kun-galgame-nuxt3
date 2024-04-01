import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { Galgame } from './types/galgame'

const GalgameSchema = new mongoose.Schema<Galgame>(
  {
    gid: { type: Number, unique: true },
    vndb_id: { type: Number, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    name: {
      en_us: { type: String, default: '' },
      ja_jp: { type: String, default: '' },
      zh_cn: { type: String, default: '' }
    },
    banner: { type: String, required: true },
    introduction: {
      en_us: { type: String, default: '' },
      ja_jp: { type: String, default: '' },
      zh_cn: { type: String, default: '' }
    },
    platform: { type: [String], default: [] },

    time: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    contributor: { type: [Number], default: [] },
    likes: { type: [Number], default: [] },
    favorites: { type: [Number], default: [] },

    comments_count: { type: Number, default: 0 },
    contributor_count: { type: Number, default: 0 },
    likes_count: { type: Number, default: 0 },
    favorites_count: { type: Number, default: 0 },

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
