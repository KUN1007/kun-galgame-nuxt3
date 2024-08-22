import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { Galgame } from './types/galgame'

const GalgameSchema = new mongoose.Schema<Galgame>(
  {
    gid: { type: Number, unique: true },
    vndb_id: { type: String, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    name: {
      'en-us': { type: String, default: '', maxlength: 100007 },
      'ja-jp': { type: String, default: '', maxlength: 100007 },
      'zh-cn': { type: String, default: '', maxlength: 100007 }
    },
    banner: { type: String, default: '', maxlength: 1007 },
    introduction: {
      'en-us': { type: String, default: '', maxlength: 100007 },
      'ja-jp': { type: String, default: '', maxlength: 100007 },
      'zh-cn': { type: String, default: '', maxlength: 100007 }
    },

    time: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    type: { type: [String], default: [] },
    language: { type: [String], default: [] },
    platform: { type: [String], default: [] },
    contributor: { type: [Number], default: [] },
    likes: { type: [Number], default: [] },
    favorites: { type: [Number], default: [] },

    series: { type: [Number], default: [] },
    resources: { type: [Number], default: [] },
    links: { type: [Number], default: [] },
    histories: { type: [Number], default: [] },
    comments: { type: [Number], default: [] },

    alias: { type: [String], default: [] },
    official: { type: [String], default: [] },
    engine: { type: [String], default: [] },
    tags: { type: [String], default: [] }
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
