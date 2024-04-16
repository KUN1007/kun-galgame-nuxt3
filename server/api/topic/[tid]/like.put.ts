import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import mongoose from 'mongoose'
import type { TopicLikeTopicRequestData } from '~/types/api/topic'

const updateTopicLike = async (
  uid: number,
  to_uid: number,
  tid: number,
  isPush: boolean
) => {
  if (uid === to_uid) {
    return
  }

  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  const isLikedTopic = topic.likes.includes(uid)
  if (isLikedTopic && isPush) {
    return 10212
  }

  const moemoepointAmount = isPush ? 1 : -1
  const popularity = isPush ? 2 : -2

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const topic = await TopicModel.findOneAndUpdate(
      { tid },
      {
        $inc: { popularity },
        [isPush ? '$push' : '$pull']: { likes: uid }
      }
    )

    await UserModel.updateOne(
      { uid },
      { [isPush ? '$push' : '$pull']: { like_topic: tid } }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    if (isPush) {
      await createDedupMessage(
        uid,
        to_uid,
        'liked',
        topic?.content.slice(0, 233) ?? '',
        tid
      )
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
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
  const uid = userInfo.uid

  const { to_uid, isPush }: TopicLikeTopicRequestData = await getQuery(event)
  if (!to_uid || !isPush) {
    return kunError(event, 10507)
  }

  if (uid.toString() === to_uid) {
    return
  }

  const result = await updateTopicLike(
    uid,
    parseInt(to_uid),
    parseInt(tid),
    isPush === 'true'
  )
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE like topic operation successfully!'
})
