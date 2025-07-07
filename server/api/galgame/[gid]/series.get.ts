import prisma from '~/prisma/prisma'
import { getGalgameSeriesSchema } from '~/validations/galgame'
import type { GalgameSeries } from '~/types/api/galgame'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameSeriesSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const galgame = await prisma.galgame.findUnique({
    where: { id: input.galgameId },
    include: {
      series: {
        select: {
          id: true,
          name: true,
          description: true,
          galgame: {
            select: {
              id: true,
              name_en_us: true,
              name_ja_jp: true,
              name_zh_cn: true,
              name_zh_tw: true,
              banner: true
            }
          }
        }
      }
    }
  })
  if (!galgame) {
    return kunError(event, '未找到这个 Galgame')
  }

  const series: GalgameSeries | null = galgame.series

  return series
})
