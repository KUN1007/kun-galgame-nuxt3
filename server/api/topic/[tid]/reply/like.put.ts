import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'

const updateReplyLike = async (uid: number, rid: number) => {
  const reply = await ReplyModel.findOne({ rid })
  if (!reply) {
    return 10506
  }

  if (uid === reply.r_uid) {
    return
  }

  const isLikedReply = reply.likes.includes(uid)
  const moemoepointAmount = isLikedReply ? -1 : 1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await ReplyModel.updateOne(
      { rid },
      { [isLikedReply ? '$pull' : '$addToSet']: { likes: uid } }
    )

    await UserModel.updateOne(
      { uid: reply.r_uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    await createDedupMessage(
      uid,
      reply.r_uid,
      'liked',
      reply.content.slice(0, 233),
      reply.tid
    )

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

  const { rid }: { rid: string } = await getQuery(event)
  if (!rid) {
    return kunError(event, 10507)
  }

  const result = await updateReplyLike(userInfo.uid, parseInt(rid))
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE like reply successfully!'
})
