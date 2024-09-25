import mongoose from 'mongoose'
import env from '~/server/env/dotenv'
import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import { uploadGalgameBanner } from '../utils/uploadGalgameBanner'

export default defineEventHandler(async (event) => {
  const bannerFile = await readMultipartFormData(event)
  if (!bannerFile || !Array.isArray(bannerFile)) {
    return kunError(event, 10110)
  }

  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10609)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const user = await UserModel.findOne({ uid: userInfo.uid }).lean()
  if (!user) {
    return kunError(event, 10101)
  }

  const galgame = await GalgameModel.findOne({ gid, status: { $ne: 1 } }).lean()
  if (!galgame) {
    return kunError(event, 10610)
  }

  if (userInfo.uid !== galgame.uid && user.roles < 2) {
    return kunError(event, 10632)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const res = await uploadGalgameBanner(bannerFile[0].data, parseInt(gid))
    if (!res) {
      return kunError(event, 10116)
    }
    if (typeof res === 'number') {
      return kunError(event, res)
    }

    const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/galgame/${gid}/banner/banner.webp`
    await GalgameModel.updateOne({ gid }, { $set: { banner: imageLink } })

    await createGalgameHistory({
      gid: parseInt(gid),
      uid: userInfo.uid,
      time: Date.now(),
      action: 'updated',
      type: 'banner',
      content: ''
    })

    await session.commitTransaction()

    return 'MOEMOE update galgame banner successfully!'
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
