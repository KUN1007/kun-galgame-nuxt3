import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import mongoose from 'mongoose'
import type { TopicFavoriteTopicRequestData } from '~/types/api/topic'

const updateTopicFavorite = async (
  uid: number,
  to_uid: number,
  tid: number,
  isPush: boolean
) => {
  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  const isFavoriteTopic = topic.favorites.includes(uid)
  if (isFavoriteTopic && isPush) {
    return 10221
  }

  const moemoepointAmount = isPush ? 1 : -1
  const popularity = isPush ? 2 : -2

  if (uid === to_uid) {
    await TopicModel.findOneAndUpdate(
      { tid },
      { [isPush ? '$push' : '$pull']: { favorites: uid } }
    )

    await UserModel.updateOne(
      { uid },
      { [isPush ? '$push' : '$pull']: { favorite_topic: tid } }
    )
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const topic = await TopicModel.findOneAndUpdate(
      { tid },
      {
        $inc: { popularity },
        [isPush ? '$push' : '$pull']: { favorites: uid }
      }
    )

    await UserModel.updateOne(
      { uid },
      { [isPush ? '$push' : '$pull']: { favorite_topic: tid } }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: moemoepointAmount } }
    )

    if (isPush) {
      await createDedupMessage(
        uid,
        to_uid,
        'favorite',
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
    kunError(event, 10210)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const { to_uid, isPush }: TopicFavoriteTopicRequestData =
    await getQuery(event)
  if (!to_uid || !isPush) {
    kunError(event, 10507)
    return
  }

  const result = await updateTopicFavorite(
    uid,
    parseInt(to_uid),
    parseInt(tid),
    isPush === 'true'
  )
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE favorite topic operation successfully!'
})
