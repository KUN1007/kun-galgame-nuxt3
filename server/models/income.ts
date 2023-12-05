import mongoose from 'mongoose'
import increasingSequence from '../middleware/increasing-sequence'

import { IncomeAttributes } from './types/income'

const IncomeSchema = new mongoose.Schema<IncomeAttributes>(
  {
    iid: { type: Number, unique: true },
    reason: { type: String, default: '' },
    time: { type: Number, default: Date.now() },
    amount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

IncomeSchema.pre('save', increasingSequence('iid'))

const IncomeModel = mongoose.model<IncomeAttributes>('income', IncomeSchema)

export default IncomeModel
