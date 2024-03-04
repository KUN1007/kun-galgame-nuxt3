import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { NonMoeAttributes } from './types/non-moe'

const NonMoeSchema = new mongoose.Schema<NonMoeAttributes>(
  {
    nid: { type: Number, unique: true },
    uid: { type: Number, required: true },
    name: { type: String, require: true },
    description: { type: String, required: true },
    time: { type: Number, default: Date.now() },
    result: { type: String, required: true }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

NonMoeSchema.pre('save', increasingSequence('nid'))

const NonMoeModel = mongoose.model<NonMoeAttributes>('nonmoe', NonMoeSchema)

export default NonMoeModel
