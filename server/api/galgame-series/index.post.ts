import prisma from '~/prisma/prisma'
import { createGalgameSeriesSchema } from '~/validations/galgame-series'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }

  if (userInfo.role <= 2) {
    return kunError(event, '您没有权限创建 Galgame 系列')
  }

  const input = await kunParsePostBody(event, createGalgameSeriesSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { galgameIds, ...seriesData } = input

  return await prisma.$transaction(async (prisma) => {
    const newSeries = await prisma.galgame_series.create({
      data: seriesData
    })

    await prisma.galgame.updateMany({
      where: {
        id: {
          in: galgameIds
        }
      },
      data: {
        series_id: newSeries.id
      }
    })

    return 'Moemoe create galgame series successfully!'
  })
})
