import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { TopicAside } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const { uid }: { uid: string } = await getQuery(event)
  if (!uid) {
    kunError(event, 10507)
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const user = await UserModel.findOne({ uid })
    if (!user) {
      kunError(event, 10101)
      return
    }
    const popularTIDs = user.topic
    const popularTopics = await TopicModel.find({
      tid: { $in: popularTIDs, $ne: tid }
    })
      .sort({ popularity: -1 })
      .limit(5)
      .select('title tid')

    const topic: TopicAside[] = popularTopics.map((topic) => ({
      title: topic.title,
      tid: topic.tid
    }))

    await session.commitTransaction()
    session.endSession()

    return topic
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
})
