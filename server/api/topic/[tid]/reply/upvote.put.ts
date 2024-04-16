import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import { isValidTimestamp } from '~/utils/validate'
import type { TopicUpvoteReplyRequestData } from '~/types/api/reply'

const updateReplyUpvote = async (
  uid: number,
  to_uid: number,
  rid: number,
  tid: number,
  time: number
) => {
  const userInfo = await UserModel.findOne({ uid })
  if (!userInfo) {
    return 10115
  }

  const moemoepoint = userInfo.moemoepoint
  if (moemoepoint < 1100) {
    return 10508
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const reply = await ReplyModel.findOneAndUpdate(
      { rid },
      {
        $set: { upvote_time: time },
        $push: { upvotes: uid }
      }
    )

    await UserModel.updateOne({ uid }, { $inc: { moemoepoint: -3 } })

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: 1, upvote: 1 } }
    )

    await createMessage(uid, to_uid, 'upvoted', reply?.content ?? '', tid)

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

  const { to_uid, rid, time }: TopicUpvoteReplyRequestData =
    await getQuery(event)
  if (!to_uid || !rid || !time) {
    return kunError(event, 10507)
  }

  if (uid.toString() === to_uid) {
    return
  }

  if (!isValidTimestamp(parseInt(time))) {
    return kunError(event, 10208)
  }

  const result = await updateReplyUpvote(
    uid,
    parseInt(to_uid),
    parseInt(rid),
    parseInt(tid),
    parseInt(time)
  )
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE upvote reply operation successfully!'
})
