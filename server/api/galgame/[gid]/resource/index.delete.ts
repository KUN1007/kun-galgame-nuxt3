import mongoose from 'mongoose'
import GalgameModel from '~/server/models/galgame'
import GalgameResourceModel from '~/server/models/galgame-resource'
import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const { grid }: { grid: string } = await getQuery(event)
  if (!grid) {
    kunError(event, 10507)
    return
  }

  const resource = await GalgameResourceModel.findOne({
    grid,
    status: { $ne: 1 }
  }).lean()
  if (!resource) {
    kunError(event, 10622)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  if (resource.uid !== userInfo.uid) {
    kunError(event, 10623)
    return
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
  } finally {
    await session.endSession()
  }
})
