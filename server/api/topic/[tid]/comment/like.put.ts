import UserModel from '~/server/models/user'
import CommentModel from '~/server/models/comment'
import mongoose from 'mongoose'
import type { TopicLikeCommentRequestData } from '~/types/api/comment'

export default defineEventHandler(async (event) => {
  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115)
    return
  }
  const uid = userInfo.uid

  const { cid, to_uid }: TopicLikeCommentRequestData = await getQuery(event)
  if (!cid || !to_uid) {
    kunError(event, 10507)
    return
  }

  if (uid.toString() === to_uid) {
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await CommentModel.updateOne({ cid }, { $addToSet: { likes: uid } })
    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { like: 1, moemoepoint: 1 } }
    )

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }

  return 'MOEMOE like comment successfully!'
})
