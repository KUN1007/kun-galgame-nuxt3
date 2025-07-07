import { subDays } from 'date-fns'
import env from '~/server/env/dotenv'
import GalgameModel from '~/server/models/galgame'
import GalgameLinkModel from '~/server/models/galgame-link'
import UserModel from '~/server/models/user'
import { checkGalgamePublish } from './utils/checkGalgamePublish'
import { uploadGalgameBanner } from './utils/uploadGalgameBanner'
import prisma from '~/prisma/prisma'
import { createGalgameSchema } from '~/validations/galgame'
import type { H3Event } from 'h3'

const readGalgameData = async (event: H3Event) => {
  // const formData = await readFormData(event)

  // const vndbIdData = formData.get('vndbId')
  // const seriesIdData = formData.get('seriesId')
  // const officialIdData = formData.get('officialId')
  // const engineIdData = formData.get('engineId')
  // const tagIdData = formData.get('tagId')

  // const nameData = formData.get('name')
  // const introductionData = formData.get('introduction')
  // const contentLimitData = formData.get('contentLimit')
  // const aliasesData = formData.get('aliases')
  // const bannerData = formData.get('banner')
  // if (
  //   !vndbIdData ||
  //   !seriesIdData ||
  //   !officialIdData ||
  //   !engineIdData ||
  //   !tagIdData ||
  //   !nameData ||
  //   !introductionData ||
  //   !contentLimitData ||
  //   !aliasesData ||
  //   !bannerData
  // ) {
  //   return kunError(event, 10507)
  // }

  // const vndbId = vndbIdData.toString()
  // const seriesId = seriesIdData.toString()
  // const contentLimit = contentLimitData.toString()
  // const name = JSON.parse(nameData.toString()) as KunLanguage
  // const introduction = JSON.parse(introductionData.toString()) as KunLanguage
  // const aliases = JSON.parse(aliasesData.toString()) as string[]
  // const official = JSON.parse(officialData.toString()) as string[]
  // const engine = JSON.parse(engineData.toString()) as string[]
  // const tags = JSON.parse(tagsData.toString()) as string[]
  // const banner = await new Response(bannerData).arrayBuffer()

  const input = await kunParseFormData(event, createGalgameSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const galgame = await prisma.galgame.count({
    where: { vndb_id: input.vndbId }
  })
  if (galgame) {
    return kunError(event, '未找到这个 Galgame')
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const user = await prisma.user.findUnique({
    where: { id: userInfo.uid },
    include: {
      galgame: {
        where: {
          created: {
            gte: subDays(new Date(), 1)
          }
        }
      }
    }
  })
  if (!user) {
    return kunError(event, '未找到该用户')
  }

  if (user.moemoepoint / 10 < user.galgame.length) {
    return kunError(event, '您今日发布的 Galgame 已经达到上限')
  }

  return { result: input, uid: userInfo.uid }
}

export default defineEventHandler(async (event) => {
  const res = await readGalgameData(event)
  if (!res) {
    return
  }
  const { result, uid } = res

  return await prisma.$transaction(
    async (prisma) => {
      const newGalgame = await prisma.galgame.create({
        data: {
          name_en_us: result.name_en_us,
          name_ja_jp: result.name_ja_jp,
          name_zh_cn: result.name_zh_cn,
          name_zh_tw: result.name_zh_tw,
          intro_en_us: result.intro_en_us,
          intro_ja_jp: result.intro_ja_jp,
          intro_zh_cn: result.intro_zh_cn,
          intro_zh_tw: result.intro_zh_tw,
          vndb_id: result.vndbId,
          series_id: result.seriesId,
          content_limit: result.contentLimit,
          user_id: uid
        }
      })

      await prisma.galgame_contributor.create({
        data: {
          galgame_id: newGalgame.id,
          user_id: uid
        }
      })

      await prisma.user.update({
        where: { id: uid },
        data: { moemoepoint: { increment: 3 } }
      })

      // TODO:

      const res = await uploadGalgameBanner(
        Buffer.from(result.banner),
        newGalgame.id
      )
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

      return newGalgame.gid
    },
    { timeout: 60000 }
  )
})
