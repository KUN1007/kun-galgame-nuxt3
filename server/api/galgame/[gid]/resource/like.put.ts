import UserModel from '~/server/models/user'
import GalgameResourceModel from '~/server/models/galgame-resource'
import mongoose from 'mongoose'

const updateGalgameResourceLike = async (grid: number, uid: number) => {
  const resource = await GalgameResourceModel.findOne({ grid }).lean()
  if (!resource) {
    return 10622
  }
  if (resource.uid === uid) {
    return
  }
  if (resource.likes.includes(uid)) {
    return 10624
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await GalgameResourceModel.updateOne(
      { grid },
      { $addToSet: { likes: uid } }
    )

    await UserModel.updateOne(
      { uid },
      { $addToSet: { like_galgame_resource: grid } }
    )

    await UserModel.updateOne(
      { uid: resource.uid },
      { $inc: { moemoepoint: 1, like: 1 } }
    )

    await createMessage(
      uid,
      resource.uid,
      'liked',
      resource.link[0].slice(0, 233),
      0,
      resource.gid
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
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    return kunError(event, 10507)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const result = await updateGalgameResourceLike(parseInt(grid), uid)
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE like galgame resource operation successfully!'
})
