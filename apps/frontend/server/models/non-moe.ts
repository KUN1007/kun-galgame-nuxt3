import mongoose, { Schema } from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { NonMoeAttributes } from './types/non-moe'

const NonMoeSchema = new mongoose.Schema<NonMoeAttributes>(
  {
    nid: { type: Number, unique: true },
    uid: { type: Number, required: true },
    name: { type: String, require: true },
    description: {
      'en-us': { type: String, default: '' },
      'ja-jp': { type: String, default: '' },
      'zh-cn': { type: String, default: '' },
      'zh-tw': { type: String, default: '' }
    },
    time: { type: Number, default: Date.now() },
    result: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

NonMoeSchema.pre('save', increasingSequence('nid'))

const NonMoeModel = mongoose.model<NonMoeAttributes>('nonmoe', NonMoeSchema)

export default NonMoeModel
