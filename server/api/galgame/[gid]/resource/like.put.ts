import UserModel from '~/server/models/user'
import GalgameResourceModel from '~/server/models/galgame-resource'
import mongoose from 'mongoose'

const updateGalgameResourceLike = async (grid: number, uid: number) => {
  const resource = await GalgameResourceModel.findOne({
    grid,
    status: { $ne: 1 }
  }).lean()
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
      resource.link.slice(0, 233),
      -resource.gid
    )

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    kunError(event, 10507)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const result = await updateGalgameResourceLike(parseInt(grid), uid)
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE like galgame resource operation successfully!'
})
