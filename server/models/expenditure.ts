import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { ExpenditureAttributes } from './types/expenditure'

const ExpenditureSchema = new mongoose.Schema<ExpenditureAttributes>(
  {
    eid: { type: Number, unique: true },
    reason: { type: String, default: '' },
    time: { type: Number, default: Date.now() },
    amount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ExpenditureSchema.pre('save', increasingSequence('eid'))

const ExpenditureModel = mongoose.model<ExpenditureAttributes>(
  'expenditure',
  ExpenditureSchema
)

export default ExpenditureModel
