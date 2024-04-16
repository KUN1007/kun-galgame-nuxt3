import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import mongoose from 'mongoose'
import { isValidTimestamp } from '~/utils/validate'
import type { TopicUpvoteTopicRequestData } from '~/types/api/topic'

const updateTopicUpvote = async (
  uid: number,
  to_uid: number,
  tid: number,
  time: number
) => {
  const userInfo = await UserModel.findOne({ uid })
  if (!userInfo) {
    return 10115
  }

  const moemoepoint = userInfo.moemoepoint
  if (moemoepoint < 1100) {
    return 10202
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const topic = await TopicModel.findOneAndUpdate(
      { tid },
      {
        $set: { upvote_time: time },
        $push: { upvotes: uid },
        $inc: { popularity: 50 }
      }
    )

    await UserModel.updateOne(
      { uid },
      {
        $inc: { moemoepoint: -17 },
        $addToSet: {
          upvote_topic: tid
        }
      }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: 7, upvote: 1 } }
    )

    await createMessage(
      uid,
      to_uid,
      'upvoted',
      topic?.content.slice(0, 233) ?? '',
      tid
    )

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

  const { to_uid, time }: TopicUpvoteTopicRequestData = await getQuery(event)
  if (!to_uid || !time) {
    return kunError(event, 10507)
  }

  if (uid.toString() === to_uid) {
    return
  }

  if (!isValidTimestamp(parseInt(time))) {
    return kunError(event, 10208)
  }

  const result = await updateTopicUpvote(
    uid,
    parseInt(to_uid),
    parseInt(tid),
    parseInt(time)
  )
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE upvote topic operation successfully!'
})
