import mongoose from 'mongoose'
import env from '~/server/env/dotenv'
import GalgameModel from '~/server/models/galgame'
import UserModel from '~/server/models/user'
import { checkGalgamePublish } from './utils/checkGalgamePublish'
import { uploadGalgameBanner } from './utils/uploadGalgameBanner'
import type { H3Event } from 'h3'

const readGalgameData = async (event: H3Event) => {
  const formData = await readFormData(event)

  const vndbIdData = formData.get('vndbId')
  const nameData = formData.get('name')
  const introductionData = formData.get('introduction')
  const aliasesData = formData.get('aliases')
  const bannerData = formData.get('banner')
  if (
    !vndbIdData ||
    !nameData ||
    !introductionData ||
    !aliasesData ||
    !bannerData
  ) {
    kunError(event, 10507)
    return
  }

  const vndbId = vndbIdData.toString()
  const name = JSON.parse(nameData.toString()) as KunLanguage
  const introduction = JSON.parse(introductionData.toString()) as KunLanguage
  const aliases = JSON.parse(aliasesData.toString())
  const banner = await new Response(bannerData).arrayBuffer()
  const res = checkGalgamePublish(vndbId, name, introduction, aliases)
  if (res) {
    kunError(event, res)
    return
  }

  const galgame = await GalgameModel.findOne({ vndb_id: vndbId })
  if (galgame) {
    kunError(event, 10608)
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
    introduction,
    aliases
  }
}

export default defineEventHandler(async (event) => {
  const result = await readGalgameData(event)
  if (!result) {
    return
  }
  const { uid, vndb_id, name, banner, introduction, aliases } = result

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
      introduction,
      alias: aliases,
      time: Date.now()
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
      { $addToSet: { contributor: uid } }
    )

    const res = await uploadGalgameBanner(banner, savedGalgame.gid)
    if (!res) {
      kunError(event, 10116)
      return
    }
    if (typeof res === 'number') {
      kunError(event, res)
      return
    }

    const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/galgame/${savedGalgame.gid}/banner/banner.webp`
    await GalgameModel.updateOne(
      { gid: savedGalgame.gid },
      { $set: { banner: imageLink } }
    )

    await createGalgameHistory({
      gid: savedGalgame.gid,
      uid,
      time: Date.now(),
      action: 'created',
      type: 'galgame',
      content: ''
    })

    await session.commitTransaction()

    return savedGalgame.gid
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
})
