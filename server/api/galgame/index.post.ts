import mongoose from 'mongoose'
import env from '~/server/env/dotenv'
import GalgameModel from '~/server/models/galgame'
import GalgameLinkModel from '~/server/models/galgame-link'
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
    return kunError(event, 10507)
  }

  const vndbId = vndbIdData.toString()
  const name = JSON.parse(nameData.toString()) as KunLanguage
  const introduction = JSON.parse(introductionData.toString()) as KunLanguage
  const aliases = JSON.parse(aliasesData.toString())
  const banner = await new Response(bannerData).arrayBuffer()
  const res = checkGalgamePublish(vndbId, name, introduction, aliases)
  if (res) {
    return kunError(event, res)
  }

  const galgame = await GalgameModel.findOne({ vndb_id: vndbId })
  if (galgame) {
    return kunError(event, 10608)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
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
    return kunError(event, 10101)
  }

  if (user.moemoepoint / 10 < user.daily_galgame_count) {
    return kunError(event, 10607)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const newGalgame = await GalgameModel.create({
      vndb_id,
      uid,
      name,
      introduction,
      alias: aliases,
      time: Date.now()
    })

    await UserModel.updateOne(
      { uid },
      {
        $addToSet: {
          galgame: newGalgame.gid,
          contribute_galgame: newGalgame.gid
        },
        $inc: { daily_galgame_count: 1, daily_image_count: 1, moemoepoint: 3 }
      }
    )

    await GalgameModel.updateOne(
      { gid: newGalgame.gid },
      { $addToSet: { contributor: uid } }
    )

    const res = await uploadGalgameBanner(banner, newGalgame.gid)
    if (!res) {
      return kunError(event, 10116)
    }
    if (typeof res === 'number') {
      return kunError(event, res)
    }

    const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/galgame/${newGalgame.gid}/banner/banner.webp`
    await GalgameModel.updateOne(
      { gid: newGalgame.gid },
      { $set: { banner: imageLink } }
    )

    await GalgameLinkModel.create({
      gid: newGalgame.gid,
      uid,
      name: 'VNDB',
      link: `https://vndb.org/${vndb_id}`
    })

    await createGalgameHistory({
      gid: newGalgame.gid,
      uid,
      time: Date.now(),
      action: 'created',
      type: 'galgame',
      content: ''
    })

    await session.commitTransaction()

    return newGalgame.gid
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
