import env from '~/server/env/dotenv'
import prisma from '~/prisma/prisma'
import { uploadGalgameBanner } from '../utils/uploadGalgameBanner'
import { updateGalgameBannerSchema } from '~/validations/galgame'

export default defineEventHandler(async (event) => {
  const bannerFile = await readMultipartFormData(event)
  if (!bannerFile || !Array.isArray(bannerFile)) {
    return kunError(event, '读取图片失败')
  }

  const input = await kunParsePutBody(event, updateGalgameBannerSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const uid = userInfo.uid

  const galgame = await prisma.galgame.findUnique({
    where: { id: input.galgameId, status: { not: 1 }, user_id: userInfo.uid }
  })
  if (!galgame) {
    return kunError(event, '未找到这个 Galgame')
  }
  if (galgame.user_id !== uid || userInfo.role < 2) {
    return kunError(event, '您没有权限更改这个 Galgame 的预览图')
  }

  return await prisma.$transaction(async (prisma) => {
    const res = await uploadGalgameBanner(
      Buffer.from(bannerFile[0].data),
      input.galgameId
    )
    if (!res) {
      return kunError(event, '上传 Galgame 预览图错误')
    }
    if (typeof res === 'string') {
      return kunError(event, res)
    }

    const imageLink = `${env.KUN_VISUAL_NOVEL_IMAGE_BED_URL}/galgame/${galgame.id}/banner/banner.webp`

    await prisma.galgame.update({
      where: { id: galgame.id },
      data: { banner: imageLink }
    })

    await purgeCache('galgameBanner', galgame.id)

    await createGalgameHistory(prisma, {
      galgame_id: galgame.id,
      user_id: userInfo.uid,
      action: 'updated',
      type: 'banner',
      content: ''
    })

    return 'MOEMOE update galgame banner successfully!'
  })
})
