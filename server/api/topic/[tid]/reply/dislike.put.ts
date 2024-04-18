import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'

const updateReplyDislike = async (uid: number, rid: number) => {
  const reply = await ReplyModel.findOne({ rid })
  if (!reply) {
    return 10506
  }

  if (uid === reply.r_uid) {
    return
  }

  const isDislikedReply = reply.dislikes.includes(uid)
  if (isDislikedReply) {
    return 10510
  }

  const amount = isDislikedReply ? -1 : 1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await ReplyModel.updateOne(
      { rid },
      { [isDislikedReply ? '$pull' : '$addToSet']: { dislikes: uid } }
    )

    await UserModel.updateOne(
      { uid: reply.r_uid },
      { $inc: { dislike: amount } }
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

  const result = await updateReplyDislike(userInfo.uid, parseInt(rid))
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE dislike reply successfully!'
})
