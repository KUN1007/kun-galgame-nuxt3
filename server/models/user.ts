import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import type { UserAttributes } from './types/user'

const UserSchema = new mongoose.Schema<UserAttributes>(
  {
    uid: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ip: { type: String, default: '' },
    avatar: { type: String, default: '' },
    roles: { type: Number, default: 1 },
    status: { type: Number, default: 0 },
    time: { type: Number, default: Date.now() },
    moemoepoint: { type: Number, default: 1007 },
    bio: { type: String, default: '' },
    upvote: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },

    daily_topic_count: { type: Number, default: 0 },
    daily_galgame_count: { type: Number, default: 0 },
    daily_image_count: { type: Number, default: 0 },
    daily_check_in: { type: Number, default: 0 },

    friend: { type: [Number], default: [] },
    followed: { type: [Number], default: [] },
    follower: { type: [Number], default: [] },
    reply: { type: [Number], default: [] },
    comment: { type: [Number], default: [] },

    topic: { type: [Number], default: [] },
    like_topic: { type: [Number], default: [] },
    dislike_topic: { type: [Number], default: [] },
    upvote_topic: { type: [Number], default: [] },
    favorite_topic: { type: [Number], default: [] },

    galgame: { type: [Number], default: [] },
    like_galgame: { type: [Number], default: [] },
    favorite_galgame: { type: [Number], default: [] },
    contribute_galgame: { type: [Number], default: [] },

    galgame_resource: { type: [Number], default: [] },
    like_galgame_resource: { type: [Number], default: [] }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

UserSchema.pre('save', increasingSequence('uid'))

const UserModel = mongoose.model<UserAttributes>('user', UserSchema)

export default UserModel
