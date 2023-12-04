import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { ReplyAttributes } from './types/replyModel'

// 回复 schema 结构
const ReplySchema = new mongoose.Schema<ReplyAttributes>(
  {
    // 回复的 ID，从 1 开始且唯一，自动生成
    rid: { type: Number, unique: true },
    // 回复所属话题的 ID，标志了该条回复是属于哪个话题的
    tid: { type: Number, required: true },
    // 回复人的 uid，标识了这个回复是谁发的
    r_uid: { type: Number, required: true },
    // 被回复人的 uid，标志了这个回复是回给谁的
    to_uid: { type: Number, required: true },
    // 回复的楼层数，标志了这个回复属于该话题的几楼
    floor: { type: Number, default: 0 },
    // 被回复的人的楼层数，方便点击跳转
    to_floor: { type: Number, default: 0 },
    // 回复的 tag，可选，字符串数组
    tags: { type: [String], default: [] },
    // 回复发布的时间
    time: { type: Number, default: 0 },
    // 回复被再次编辑的时间
    edited: { type: Number, default: 0 },
    // 回复的内容
    content: { type: String, default: '' },
    // 回复被推的时间
    upvote_time: { type: Number, default: 0 },

    // 回复的点赞计数
    likes_count: { type: Number, default: 0 },
    // 回复的评论计数
    comments_count: { type: Number, default: 0 },

    // 回复被推数组，存放了推回复用户的 uid
    upvotes: { type: [Number], default: [] },
    // 回复的点赞数组，存放了点赞用户的 uid
    likes: { type: [Number], default: [] },
    // 回复的点踩数组，存放了点踩用户的 uid
    dislikes: { type: [Number], default: [] },
    // 回复的分享数组，存放了分享用户的 uid
    share: { type: [Number], default: [] },
    // 回复的评论数组，存放了回复底下评论的 uid
    comment: { type: [String], default: [] },
  },
  // 时间戳，自动创建
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// 创建虚拟字段 'users'，用于和用户关联
ReplySchema.virtual('r_user', {
  ref: 'user', // 关联的模型名称
  localField: 'r_uid', // 当前模型中用于关联的字段
  foreignField: 'uid', // 关联模型中用于关联的字段
})

// 创建虚拟字段 'users'，用于和用户关联
ReplySchema.virtual('to_user', {
  ref: 'user', // 关联的模型名称
  localField: 'to_uid', // 当前模型中用于关联的字段
  foreignField: 'uid', // 关联模型中用于关联的字段
})

// pre-save 钩子，在保存文档之前自动递增 rid 字段
ReplySchema.pre('save', increasingSequence('rid'))

const ReplyModel = mongoose.model<ReplyAttributes>('reply', ReplySchema)

export default ReplyModel
