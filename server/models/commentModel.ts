import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { CommentAttributes } from './types/commentModel'

// 评论 schema 结构
const CommentSchema = new mongoose.Schema<CommentAttributes>(
  {
    // 评论的 ID，从 1 开始且要求唯一，在用户发评论时自动增加
    cid: { type: Number, unique: true },
    // 评论所属的回复 ID，标识了这个评论是属于哪个回复的
    rid: { type: Number, required: true },
    // 评论所属的话题 ID，标识了这个评论是哪个话题底下的
    tid: { type: Number, required: true },
    // 评论者的 uid，和用户关联，标识了这是谁发的评论
    c_uid: { type: Number, required: true, ref: 'user' },
    // 被评论者的 uid，和用户关联，标识了这个评论是发给谁的
    to_uid: { type: Number, required: true, ref: 'user' },
    // 评论的内容，纯文字，无富文本
    content: { type: String, default: '' },

    // 评论点赞计数
    likes_count: { type: Number, default: 0 },
    // 评论点踩计数
    dislikes_count: { type: Number, default: 0 },

    // 评论的点赞数组，存放了点赞用户的 uid
    likes: { type: [Number], default: [] },
    // 评论的点踩数，存放了点踩用户的 uid
    dislikes: { type: [Number], default: [] },
  },
  // 时间戳，自动生成
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// 创建虚拟字段 'c_uid'
CommentSchema.virtual('cuid', {
  ref: 'user', // 关联的模型名称
  localField: 'c_uid', // 当前模型中用于关联的字段
  foreignField: 'uid', // 关联模型中用于关联的字段
})

// 创建虚拟字段 'touid'
CommentSchema.virtual('touid', {
  ref: 'user', // 关联的模型名称
  localField: 'to_uid', // 当前模型中用于关联的字段
  foreignField: 'uid', // 关联模型中用于关联的字段
})

// pre-save 钩子，在保存文档之前自动递增 cid 字段
CommentSchema.pre('save', increasingSequence('cid'))

const CommentModel = mongoose.model<CommentAttributes>('comment', CommentSchema)

export default CommentModel
