import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgameResourceModel from '~/server/models/galgame-resource'
import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    return kunError(event, 10507)
  }

  const resource = await GalgameResourceModel.findOne({ grid }).lean()
  if (!resource) {
    return kunError(event, 10622)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  if (resource.uid !== userInfo.uid) {
    return kunError(event, 10623)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await UserModel.updateOne(
      { uid: userInfo.uid },
      {
        $inc: {
          moemoepoint: -(resource.likes.length + 5),
          like: -resource.likes.length
        }
      }
    )

    for (const likedUser of resource.likes) {
      await UserModel.updateOne(
        { uid: likedUser },
        { $pull: { like_galgame_resource: grid } }
      )
    }

    await GalgameModel.updateOne(
      { gid: resource.gid },
      { $pull: { resources: resource.grid } }
    )

    await GalgameResourceModel.deleteOne({ grid })

    return 'MOEMOE delete visualnovel resource successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
