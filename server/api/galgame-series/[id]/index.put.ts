import prisma from '~/prisma/prisma'
import { updateGalgameSeriesSchema } from '~/validations/galgame-series'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }
  if (userInfo.role <= 2) {
    return kunError(event, '您没有权限更新系列')
  }

  const input = await kunParsePutBody(event, updateGalgameSeriesSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { seriesId, galgameIds, ...seriesData } = input

  return await prisma.$transaction(async (tx) => {
    await tx.galgame_series.update({
      where: { id: seriesId },
      data: seriesData
    })

    await tx.galgame.updateMany({
      where: { series_id: seriesId },
      data: { series_id: null }
    })

    await tx.galgame.updateMany({
      where: { id: { in: galgameIds } },
      data: { series_id: seriesId }
    })

    return 'Moemoe update galgame series successfully!'
  })
})
