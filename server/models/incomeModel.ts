import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { IncomeAttributes } from './types/incomeModel'

// 收入 schema 结构
const IncomeSchema = new mongoose.Schema<IncomeAttributes>(
  {
    // 单条收入的 id，从 1 开始且唯一，在收入创建时自动加一
    iid: { type: Number, unique: true },
    // 收入发生的原因
    reason: { type: String, default: '' },
    // 收入发生的时间
    time: { type: Number, default: Date.now() },
    // 收入发生的金额
    amount: { type: Number, default: 0 },
  },
  // 收入的时间戳，自动生成
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// pre-save 钩子，在保存文档之前自动递增 iid 字段
IncomeSchema.pre('save', increasingSequence('iid'))

const IncomeModel = mongoose.model<IncomeAttributes>('income', IncomeSchema)

export default IncomeModel
