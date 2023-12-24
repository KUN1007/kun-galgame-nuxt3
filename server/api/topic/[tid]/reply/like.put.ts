import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import mongoose from 'mongoose'
import type { TopicLikeReplyRequestData } from '~/types/api/reply'

const updateReplyLike = async (
  uid: number,
  to_uid: number,
  rid: number,
  isPush: boolean
) => {
  if (uid === to_uid) {
    return
  }

  const moemoepointAmount = isPush ? 1 : -1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await ReplyModel.updateOne(
      { rid: rid },
      { [isPush ? '$addToSet' : '$pull']: { likes: uid } },
      { $inc: { likes_count: moemoepointAmount } }
    )

    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115)
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

  await updateReplyLike(uid, parseInt(to_uid), parseInt(rid), isPush === 'true')

  return 'MOEMOE like reply successfully!'
})
