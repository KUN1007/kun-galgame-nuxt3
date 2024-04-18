import UserModel from '~/server/models/user'
import CommentModel from '~/server/models/comment'
import mongoose from 'mongoose'
import type { TopicLikeCommentRequestData } from '~/types/api/topic-comment'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const { cid, to_uid }: TopicLikeCommentRequestData = await getQuery(event)
  if (!cid || !to_uid) {
    return kunError(event, 10507)
  }

  if (uid.toString() === to_uid) {
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const comment = await CommentModel.findOneAndUpdate(
      { cid },
      { $addToSet: { likes: uid } }
    )
    await UserModel.updateOne(
      { uid: to_uid },
      { $inc: { like: 1, moemoepoint: 1 } }
    )

    if (comment) {
      await createMessage(
        uid,
        parseInt(to_uid),
        'liked',
        comment.content,
        comment.tid
      )
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }

  return 'MOEMOE like comment successfully!'
})
