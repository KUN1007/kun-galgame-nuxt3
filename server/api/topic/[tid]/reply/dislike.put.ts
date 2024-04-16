import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import type { TopicDislikeReplyRequestData } from '~/types/api/reply'

const updateReplyDislike = async (
  uid: number,
  to_uid: number,
  rid: number,
  isPush: boolean
) => {
  if (uid === to_uid) {
    return
  }

  const reply = await ReplyModel.findOne({ rid })
  if (!reply) {
    return 10506
  }

  const isDislikedReply = reply.dislikes.includes(uid)
  if (isDislikedReply && isPush) {
    return 10510
  }

  const amount = isPush ? 1 : -1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await ReplyModel.updateOne(
      { rid },
      { [isPush ? '$push' : '$pull']: { dislikes: uid } }
    )

    await UserModel.updateOne({ uid: to_uid }, { $inc: { dislike: amount } })

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const { to_uid, rid, isPush }: TopicDislikeReplyRequestData =
    await getQuery(event)
  if (!to_uid || !isPush) {
    return kunError(event, 10507)
  }

  if (uid.toString() === to_uid) {
    return
  }

  const result = await updateReplyDislike(
    uid,
    parseInt(to_uid),
    parseInt(rid),
    isPush === 'true'
  )
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE dislike reply operation successfully!'
})
