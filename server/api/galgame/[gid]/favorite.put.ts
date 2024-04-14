import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import mongoose from 'mongoose'

const updateGalgameFavorite = async (gid: number, uid: number) => {
  const galgame = await GalgameModel.findOne({ gid }).lean()
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
          -gid
        )
      }
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    kunError(event, 10609)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const result = await updateGalgameFavorite(parseInt(gid), uid)
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE favorite galgame operation successfully!'
})
