import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { UpdateLogAttributes } from './types/updateLogModel'

// 更新日志 schema 结构
const UpdateLogSchema = new mongoose.Schema<UpdateLogAttributes>(
  {
    // 单个更新日志的 id，唯一，从 1 递增
    upid: { type: Number, unique: true },
    // 更新日志的记录内容
    description: { type: String, required: true, default: '' },
    // 更新的时间
    time: { type: Number, required: false, default: Date.now() },
    // 更新的版本
    version: { type: String, required: false, default: '' },
  },
  // 时间戳，自动生成
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// pre-save 钩子，在保存文档之前自动递增 upid 字段
UpdateLogSchema.pre('save', increasingSequence('upid'))

const UpdateLogModel = mongoose.model<UpdateLogAttributes>(
  'update_log',
  UpdateLogSchema
)

export default UpdateLogModel
