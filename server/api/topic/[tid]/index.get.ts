import TopicModel from '~/server/models/topic'
import UserModel from '~/server/models/user'
import mongoose from 'mongoose'
import type { TopicDetail } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    return kunError(event, 10210)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const topic = await TopicModel.findOne({ tid }).lean()
    if (!topic) {
      return kunError(event, 10211)
    }

    if (topic.status === 1) {
      return 'banned'
    }

    await TopicModel.updateOne({ tid }, { $inc: { views: 1, popularity: 0.1 } })

    const user = await UserModel.findOne({ uid: topic.uid })
    if (!user) {
      return kunError(event, 10101)
    }

    const data: TopicDetail = {
      tid: topic.tid,
      title: topic.title,
      views: topic.views,
      likes: topic.likes,
      dislikes: topic.dislikes,
      favorites: topic.favorites,
      time: topic.time,
      content: topic.content,
      upvotes: topic.upvotes,
      tags: topic.tags,
      edited: topic.edited,
      user: {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        moemoepoint: user.moemoepoint
      },
      replies: topic.replies,
      status: topic.status,
      share: topic.share,
      category: topic.category,
      section: topic.section,
      popularity: topic.popularity,
      upvote_time: topic.upvote_time
    }

    await session.commitTransaction()

    return data
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
