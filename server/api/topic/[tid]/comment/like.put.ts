import UserModel from '~/server/models/user'
import CommentModel from '~/server/models/comment'
import mongoose from 'mongoose'
import type { TopicLikeCommentRequestData } from '~/types/api/topic-comment'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const { cid }: TopicLikeCommentRequestData = await getQuery(event)
  if (!cid) {
    return kunError(event, 10507)
  }
  const comment = await CommentModel.findOne({ cid }).lean()
  if (!comment) {
    return kunError(event, 10224)
  }

  if (userInfo.uid === comment.c_uid) {
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await CommentModel.updateOne(
      { cid },
      { $addToSet: { likes: userInfo.uid } }
    )
    await UserModel.updateOne(
      { uid: comment.c_uid },
      { $inc: { like: 1, moemoepoint: 1 } }
    )

    if (comment) {
      await createMessage(
        userInfo.uid,
        comment.c_uid,
        'liked',
        comment.content.slice(0, 233),
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
