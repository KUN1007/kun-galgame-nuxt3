import mongoose from 'mongoose'
import UserModel from '@/server/models/user'
import ReplyModel from '@/server/models/reply'

const updateReplyUpvote = async (uid: number, rid: number) => {
  const reply = await ReplyModel.findOne({ rid })
  if (!reply) {
    return 10506
  }

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
    await ReplyModel.updateOne(
      { rid },
      {
        $set: { upvote_time: Date.now() },
        $push: { upvotes: uid }
      }
    )

    await UserModel.updateOne({ uid }, { $inc: { moemoepoint: -2 } })

    await UserModel.updateOne(
      { uid: reply.r_uid },
      { $inc: { moemoepoint: 1, upvote: 1 } }
    )

    await createMessage(
      uid,
      reply.r_uid,
      'upvoted',
      reply.content.slice(0, 233),
      reply.tid,
      0
    )

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

  const { rid }: { rid: string } = await getQuery(event)
  if (!rid) {
    return kunError(event, 10507)
  }
  const result = await updateReplyUpvote(userInfo.uid, parseInt(rid))
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE upvote reply operation successfully!'
})
