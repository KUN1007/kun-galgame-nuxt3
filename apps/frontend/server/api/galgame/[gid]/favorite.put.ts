import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import mongoose from 'mongoose'

const updateGalgameFavorite = async (gid: number, uid: number) => {
  const galgame = await GalgameModel.findOne({ gid, status: { $ne: 1 } }).lean()
  if (!galgame) {
    return 10211
  }

  const isFavoriteGalgame = galgame.favorites.includes(uid)
  const moemoepointAmount = isFavoriteGalgame ? -1 : 1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await GalgameModel.updateOne(
      { gid },
      { [isFavoriteGalgame ? '$pull' : '$addToSet']: { favorites: uid } }
    )

    await UserModel.updateOne(
      { uid },
      { [isFavoriteGalgame ? '$pull' : '$addToSet']: { favorite_galgame: gid } }
    )

    if (uid !== galgame.uid) {
      await UserModel.updateOne(
        { uid: galgame.uid },
        { $inc: { moemoepoint: moemoepointAmount } }
      )

      if (!isFavoriteGalgame) {
        await createDedupMessage(
          uid,
          galgame.uid,
          'favorite',
          findNonNullProperty(galgame.name),
          0,
          gid
        )
      }
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10609)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const result = await updateGalgameFavorite(parseInt(gid), uid)
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE favorite galgame operation successfully!'
})
