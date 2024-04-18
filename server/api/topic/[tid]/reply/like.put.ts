import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import type { TopicLikeReplyRequestData } from '~/types/api/topic-reply'

const updateReplyLike = async (
  uid: number,
  to_uid: number,
  rid: number,
  tid: number,
  isPush: boolean
) => {
  if (uid === to_uid) {
    return
  }

  const reply = await ReplyModel.findOne({ rid })
  if (!reply) {
    return 10506
  }

  const isLikedReply = reply.likes.includes(uid)
  if (isLikedReply && isPush) {
    return 10509
  }

  const moemoepointAmount = isPush ? 1 : -1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const reply = await ReplyModel.findOneAndUpdate(
      { rid },
      { [isPush ? '$push' : '$pull']: { likes: uid } }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    await createDedupMessage(uid, to_uid, 'liked', reply?.content ?? '', tid)

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

  const { to_uid, rid, isPush }: TopicLikeReplyRequestData =
    await getQuery(event)
  if (!to_uid || !isPush) {
    return kunError(event, 10507)
  }

  if (uid.toString() === to_uid) {
    return
  }

  const result = await updateReplyLike(
    uid,
    parseInt(to_uid),
    parseInt(rid),
    parseInt(tid),
    isPush === 'true'
  )
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE like reply operation successfully!'
})
