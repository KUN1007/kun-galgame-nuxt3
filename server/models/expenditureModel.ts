import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { ExpenditureAttributes } from './types/expenditureModel'

// 支出 schema 结构
const ExpenditureSchema = new mongoose.Schema<ExpenditureAttributes>(
  {
    // 支持的 id，从 1 开始，在支出发成的时候自动生成
    eid: { type: Number, unique: true },
    // 支出的原因
    reason: { type: String, default: '' },
    // 支出的时间
    time: { type: Number, default: Date.now() },
    // 支出的金额
    amount: { type: Number, default: 0 },
  },
  // 支出的时间戳，创建时自动生成
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// pre-save 钩子，在保存文档之前自动递增 eid 字段
ExpenditureSchema.pre('save', increasingSequence('eid'))

const ExpenditureModel = mongoose.model<ExpenditureAttributes>(
  'expenditure',
  ExpenditureSchema
)

export default ExpenditureModel
