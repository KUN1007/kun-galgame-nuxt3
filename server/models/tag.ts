import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { TagAttributes } from './types/tag'

const TagSchema = new mongoose.Schema<TagAttributes>(
  {
    tag_id: { type: Number, unique: true },
    tid: { type: Number, require: true },
    rid: { type: Number, default: 0 },
    name: { type: String, require: true },
    category: { type: [String], default: [] }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

TagSchema.pre('save', increasingSequence('tag_id'))

const TagModel = mongoose.model<TagAttributes>('tag', TagSchema)

export default TagModel
