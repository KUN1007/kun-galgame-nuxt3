import mongoose from '@/db/connection'
import increasingSequence from '@/middleware/increasingSequenceMiddleware'

import { UserAttributes } from './types/userModel'

const UserSchema = new mongoose.Schema<UserAttributes>(
  {
    // 用户 ID，从 1 开始递增且唯一
    uid: { type: Number, unique: true },
    // 用户名，唯一，允许数字字母汉字和 _ ~
    name: { type: String, required: true },
    // 用户邮箱
    email: { type: String, required: true },
    // 用户密码，已加密
    password: { type: String, required: true },
    // 用户的注册 ip，可选
    ip: { type: String, default: '' },
    // 用户头像的图片地址
    avatar: { type: String, default: '' },
    // 用户的角色，游客：0，普通用户：1，管理员：2，超级管理员：3
    roles: { type: Number, default: 1 },
    // 用户的状态，0：正常，1：封禁
    status: { type: Number, default: 0 },
    // 用户的注册时间
    time: { type: Number, default: Date.now() },
    // 用户的萌萌点
    moemoepoint: { type: Number, default: 1007 },
    // 用户的签名
    bio: { type: String, default: '' },
    // 用户的被推数
    upvote: { type: Number, default: 0 },
    // 用户的被赞数
    like: { type: Number, default: 0 },
    // 用户的被踩数
    dislike: { type: Number, default: 0 },
    // 用户今日发表的话题，每日发布上限 萌萌点 / 10 个，12 点重置
    daily_topic_count: { type: Number, default: 0 },

    // 用户的好友计数
    friend_count: { type: Number, default: 0 },
    // 用户关注的用户计数
    followed_count: { type: Number, default: 0 },
    // 用户的关注者计数
    follower_count: { type: Number, default: 0 },
    // 用户发表的话题计数
    topic_count: { type: Number, default: 0 },
    // 用户发表的回复计数
    reply_count: { type: Number, default: 0 },
    // 用户发表的评论计数
    comment_count: { type: Number, default: 0 },

    // 用户的好友数组，存放了用户好友的 uid
    friend: { type: [Number], default: [] },
    // 用户关注的用户
    followed: { type: [Number], default: [] },
    // 用户的关注者
    follower: { type: [Number], default: [] },
    // 用户发表的话题 ID，存放了用户发布话题的 tid
    topic: { type: [Number], default: [] },
    // 用户发表的回复 ID
    reply: { type: [Number], default: [] },
    // 用户发表的评论 ID
    comment: { type: [Number], default: [] },
    // 用户点赞的话题 ID
    like_topic: { type: [Number], default: [] },
    // 用户点踩的话题 ID
    dislike_topic: { type: [Number], default: [] },
    // 用户推的话题 ID
    upvote_topic: { type: [Number], default: [] },
    // 用户回复的话题 ID
    reply_topic: { type: [Number], default: [] },
  },
  // 时间戳，自动生成
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

// pre-save 钩子，在保存文档之前自动递增 utid 字段
UserSchema.pre('save', increasingSequence('uid'))

const UserModel = mongoose.model<UserAttributes>('user', UserSchema)

export default UserModel
