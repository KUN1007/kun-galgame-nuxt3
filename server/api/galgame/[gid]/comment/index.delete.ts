import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgameCommentModel from '~/server/models/galgame-comment'
import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10507)
  }
  const galgame = await GalgameModel.findOne({ gid }).lean()
  if (!galgame) {
    return kunError(event, 10610)
  }

  const { gcid }: { gcid: string } = await getQuery(event)
  if (!gcid) {
    return kunError(event, 10507)
  }

  const comment = await GalgameCommentModel.findOne({ gcid }).lean()
  if (!comment) {
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const user = await UserModel.findOne({ uid: userInfo.uid }).lean()
  if (!user) {
    return kunError(event, 10101)
  }

  if (
    comment.c_uid !== user.uid &&
    galgame.uid !== user.uid &&
    user.roles < 2
  ) {
    return kunError(event, 10639)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    if (comment.to_uid && comment.c_uid !== comment.to_uid) {
      await UserModel.updateOne(
        { uid: comment.to_uid },
        { $inc: { moemoepoint: -1 } }
      )
    }

    await UserModel.updateOne(
      { uid: comment.c_uid },
      {
        $inc: {
          moemoepoint: -comment.likes.length,
          like: -comment.likes.length
        }
      }
    )

    await GalgameCommentModel.deleteOne({ gcid })

    return 'MOEMOE delete visualnovel comment successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
