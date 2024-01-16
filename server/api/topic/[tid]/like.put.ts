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
      { tid: tid },
      {
        $inc: { popularity: popularity, likes_count: moemoepointAmount },
        [isPush ? '$push' : '$pull']: { likes: uid },
      }
    )

    await UserModel.updateOne(
      { uid: uid },
      { [isPush ? '$push' : '$pull']: { like_topic: tid } }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    if (isPush) {
      await createDedupMessage(uid, to_uid, 'liked', topic?.content ?? '', tid)
    }

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115)
    return
  }
  const uid = userInfo.uid

  const { to_uid, isPush }: TopicLikeTopicRequestData = await getQuery(event)
  if (!to_uid || !isPush) {
    kunError(event, 10507)
    return
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
