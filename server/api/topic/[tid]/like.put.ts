import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import mongoose from 'mongoose'

const updateTopicLike = async (uid: number, tid: number) => {
  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  if (uid === topic.uid) {
    return
  }

  const isLikedTopic = topic.likes.includes(uid)
  const moemoepointAmount = isLikedTopic ? -1 : 1
  const popularity = isLikedTopic ? -2 : 2

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await TopicModel.updateOne(
      { tid },
      {
        $inc: { popularity },
        [isLikedTopic ? '$pull' : '$addToSet']: { likes: uid }
      }
    )

    await UserModel.updateOne(
      { uid },
      { [isLikedTopic ? '$pull' : '$addToSet']: { like_topic: tid } }
    )

    await UserModel.updateOne(
      { uid: topic.uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    if (!isLikedTopic) {
      await createDedupMessage(
        uid,
        topic.uid,
        'liked',
        topic?.content.slice(0, 233) ?? '',
        tid
      )
    }

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
    return kunError(event, 10210)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const result = await updateTopicLike(userInfo.uid, parseInt(tid))
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE like topic successfully!'
})
