import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { TagAttributes } from './types/tagModel'

// 标签 schema 结构
const TagSchema = new mongoose.Schema<TagAttributes>(
  {
    // 单个 tag 的 ID，从 1 开始自动递增且唯一
    tag_id: { type: Number, unique: true },
    // tag 所在的话题或者回复的 id
    tid: { type: Number, require: true },
    // tag 所在的回复 id，为 0 的就是楼主话题的 tag
    rid: { type: Number, default: 0 },
    // tag 的名字
    name: { type: String, require: true },
    // tag 所属话题的分类
    category: { type: [String], default: [] },
  },
  // 时间戳，自动生成
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// pre-save 钩子，在保存文档之前自动递增 tid 字段
TagSchema.pre('save', increasingSequence('tag_id'))

const TagModel = mongoose.model<TagAttributes>('tag', TagSchema)

export default TagModel
