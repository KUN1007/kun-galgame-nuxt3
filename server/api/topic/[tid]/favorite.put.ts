import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'

const updateTopicFavorite = async (uid: number, tid: number) => {
  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  const isFavoriteTopic = topic.favorites.includes(uid)
  const moemoepointAmount = isFavoriteTopic ? -1 : 1
  const popularity = isFavoriteTopic ? -2 : 2

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await TopicModel.updateOne(
      { tid },
      {
        $inc: { popularity },
        [isFavoriteTopic ? '$pull' : '$addToSet']: { favorites: uid }
      }
    )

    await UserModel.updateOne(
      { uid },
      { [isFavoriteTopic ? '$pull' : '$addToSet']: { favorite_topic: tid } }
    )

    if (uid !== topic.uid) {
      await UserModel.updateOne(
        { uid: topic.uid },
        { $inc: { moemoepoint: moemoepointAmount } }
      )

      if (!isFavoriteTopic) {
        await createDedupMessage(
          uid,
          topic.uid,
          'favorite',
          topic?.content.slice(0, 233) ?? '',
          tid
        )
      }
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

  const result = await updateTopicFavorite(userInfo.uid, parseInt(tid))
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE favorite topic successfully!'
})
