import mongoose from 'mongoose'
import UserModel from '~/server/models/user'
import GalgameCommentModel from '~/server/models/galgame-comment'

const updateGalgameCommentLike = async (gcid: number, uid: number) => {
  const comment = await GalgameCommentModel.findOne({ gcid }).lean()
  if (!comment) {
    return 10622
  }
  if (comment.c_uid === uid) {
    return
  }
  if (comment.likes.includes(uid)) {
    return 10624
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await GalgameCommentModel.updateOne({ gcid }, { $addToSet: { likes: uid } })

    await UserModel.updateOne(
      { uid: comment.c_uid },
      { $inc: { moemoepoint: 1, like: 1 } }
    )

    await createMessage(
      uid,
      comment.c_uid,
      'liked',
      comment.content.slice(0, 233),
      0,
      comment.gid
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
  const { gcid }: { gcid: string } = await getQuery(event)
  if (!gcid) {
    return kunError(event, 10507)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const result = await updateGalgameCommentLike(parseInt(gcid), uid)
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE like galgame comment successfully!'
})
