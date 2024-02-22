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
        $inc: { popularity: 50, upvotes_count: 1 },
      }
    )

    await UserModel.updateOne(
      { uid: uid },
      {
        $inc: { moemoepoint: -17, upvote_topic_count: 1 },
        $addToSet: {
          upvote_topic: tid,
        },
      }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: 7, upvote: 1 } }
    )

    await createMessage(uid, to_uid, 'upvoted', topic?.content ?? '', tid)

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

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const { to_uid, time }: TopicUpvoteTopicRequestData = await getQuery(event)
  if (!to_uid || !time) {
    kunError(event, 10507)
    return
  }

  if (uid.toString() === to_uid) {
    return
  }

  if (!isValidTimestamp(parseInt(time))) {
    kunError(event, 10208)
    return
  }

  const result = await updateTopicUpvote(
    uid,
    parseInt(to_uid),
    parseInt(tid),
    parseInt(time)
  )
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE upvote topic operation successfully!'
})
