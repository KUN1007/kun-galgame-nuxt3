import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { TopicAttributes } from './types/topic'

const TopicSchema = new mongoose.Schema<TopicAttributes>(
  {
    tid: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    uid: { type: Number, required: true, ref: 'user' },
    tags: { type: [String], required: true },
    category: { type: [String], required: true },
    section: { type: [String], required: true },
    time: { type: Number, default: Date.now() },

    popularity: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    upvote_time: { type: Number, default: 0 },

    upvotes: { type: [Number], default: [] },
    replies: { type: [Number], default: [] },
    likes: { type: [Number], default: [] },
    share: { type: [Number], default: [] },
    dislikes: { type: [Number], default: [] },
    favorites: { type: [Number], default: [] },

    // 0 - normal, 1 - banned, 2 - pinned, 3 - essential
    status: { type: Number, default: 0 },
    edited: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

TopicSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

TopicSchema.pre('save', increasingSequence('tid'))

const TopicModel = mongoose.model<TopicAttributes>('topic', TopicSchema)

export default TopicModel
