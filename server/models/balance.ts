import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { Balance } from './types/balance'

const BalanceSchema = new mongoose.Schema<Balance>(
  {
    bid: { type: Number, unique: true },
    reason: {
      'en-us': { type: String, default: '' },
      'ja-jp': { type: String, default: '' },
      'zh-cn': { type: String, default: '' },
      'zh-tw': { type: String, default: '' }
    },
    type: { type: String, default: '' },
    time: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    status: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

BalanceSchema.pre('save', increasingSequence('bid'))

const BalanceModel = mongoose.model<Balance>('balance', BalanceSchema)

export default BalanceModel
