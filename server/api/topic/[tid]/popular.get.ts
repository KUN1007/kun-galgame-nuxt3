import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { TopicAside } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    return kunError(event, 10210)
  }

  const { uid }: { uid: string } = await getQuery(event)
  if (!uid) {
    return kunError(event, 10507)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const user = await UserModel.findOne({ uid })
    if (!user) {
      return kunError(event, 10101)
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

    return topic
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
