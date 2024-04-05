import mongoose from 'mongoose'
import env from '~/server/env/dotenv'
import GalgameModel from '~/server/models/galgame'
import UserModel from '~/server/models/user'
import { checkGalgamePublish } from './utils/checkGalgamePublish'
import { uploadGalgameBanner } from './utils/uploadGalgameBanner'
import type { H3Event } from 'h3'
import type { CreateGalgameRequestData } from '~/types/api/galgame'

const readGalgameData = async (event: H3Event) => {
  const { vndbId, name, banner, introduction }: CreateGalgameRequestData =
    await readBody(event)

  const res = checkGalgamePublish(vndbId, name, banner, introduction)
  if (res) {
    kunError(event, res)
    return
  }

  const galgame = await GalgameModel.findOne({ vndb_id: vndbId })
  if (galgame) {
    kunError(event, 10609)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  return {
    uid,
    vndb_id: vndbId,
    name,
    banner,
    introduction
  }
}

export default defineEventHandler(async (event) => {
  const result = await readGalgameData(event)
  if (!result) {
    return
  }
  const { uid, vndb_id, name, banner, introduction } = result

  const user = await UserModel.findOne({ uid })
  if (!user) {
    kunError(event, 10101)
    return
  }

  if (user.moemoepoint / 10 < user.daily_galgame_count) {
    kunError(event, 10607)
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const newGalgame = new GalgameModel({
      vndb_id,
      uid,
      name,
      introduction
    })

    const savedGalgame = await newGalgame.save()

    await UserModel.updateOne(
      { uid },
      {
        $addToSet: {
          galgame: savedGalgame.gid,
          contribute_galgame: savedGalgame.gid
        },
        $inc: { daily_galgame_count: 1, moemoepoint: 5 }
      }
    )

    await GalgameModel.updateOne(
      { gid: savedGalgame.gid },
      { $push: { contributor: uid } }
    )

    const bannerArrayBuffer = await banner.arrayBuffer()
    const res = await uploadGalgameBanner(
      Buffer.from(bannerArrayBuffer),
      savedGalgame.gid
    )
    if (!res) {
      kunError(event, 10116)
      return
    }
    if (typeof res === 'number') {
      kunError(event, res)
      return
    }

    const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/galgame/${savedGalgame.gid}/banner/avatar.webp`
    await GalgameModel.updateOne(
      { gid: savedGalgame.gid },
      { $set: { banner: imageLink } }
    )

    await session.commitTransaction()

    return savedGalgame.gid
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
