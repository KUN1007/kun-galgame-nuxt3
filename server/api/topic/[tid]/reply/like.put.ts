import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import type { TopicLikeReplyRequestData } from '~/types/api/reply'

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
      { [isPush ? '$push' : '$pull']: { likes: uid } },
      { $inc: { likes_count: moemoepointAmount } }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    await createDedupMessage(uid, to_uid, 'liked', reply?.content ?? '', tid)

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

  const { to_uid, rid, isPush }: TopicLikeReplyRequestData =
    await getQuery(event)
  if (!to_uid || !isPush) {
    kunError(event, 10507)
    return
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
    kunError(event, result)
    return
  }

  return 'MOEMOE like reply operation successfully!'
})
