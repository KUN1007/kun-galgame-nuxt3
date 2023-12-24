import TopicModel from '~/server/models/topic'
import UserModel from '~/server/models/user'
import mongoose from 'mongoose'
import type { TopicDetail } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const topic = await TopicModel.findOne({ tid }).lean()
    if (!topic) {
      kunError(event, 10211)
      return
    }

    await TopicModel.updateOne({ tid }, { $inc: { views: 1, popularity: 0.1 } })

    const user = await UserModel.findOne({ uid: topic.uid })
    if (!user) {
      kunError(event, 10101)
      return
    }

    const data: TopicDetail = {
      tid: topic.tid,
      title: topic.title,
      views: topic.views,
      likes: topic.likes,
      dislikes: topic.dislikes,
      time: topic.time,
      content: topic.content,
      upvotes: topic.upvotes,
      tags: topic.tags,
      edited: topic.edited,
      user: {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        moemoepoint: user.moemoepoint,
      },
      replies: topic.replies,
      status: topic.status,
      share: topic.share,
      category: topic.category,
      popularity: topic.popularity,
      upvote_time: topic.upvote_time,
    }

    await session.commitTransaction()
    session.endSession()

    return data
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
})
