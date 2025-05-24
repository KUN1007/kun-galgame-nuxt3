import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'

const updateTopicDislike = async (uid: number, tid: number) => {
  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  if (uid === topic.uid) {
    return
  }

  const isDislikedTopic = topic.dislikes.includes(uid)
  const amount = isDislikedTopic ? -1 : 1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await TopicModel.updateOne(
      { tid },
      { [isDislikedTopic ? '$pull' : '$addToSet']: { dislikes: uid } }
    )

    await UserModel.updateOne(
      { uid },
      { [isDislikedTopic ? '$pull' : '$addToSet']: { dislike_topic: tid } }
    )

    await UserModel.updateOne({ uid: topic.uid }, { $inc: { dislike: amount } })

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const result = await updateTopicDislike(userInfo.uid, parseInt(tid))
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE dislike topic successfully!'
})
