import prisma from '~/prisma/prisma'
import { getGalgameRankingSchema } from '~/validations/ranking'
import type { z } from 'zod'
import type { GalgameRankingItem } from '~/types/api/ranking'

const getGalgameRanking = async (
  input: z.infer<typeof getGalgameRankingSchema>
) => {
  const { page, limit, sortField, sortOrder } = input
  const skip = (page - 1) * limit

  const data = await prisma.galgame.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortField]: sortOrder
    },
    select: {
      id: true,
      name_en_us: true,
      name_ja_jp: true,
      name_zh_cn: true,
      name_zh_tw: true,
      banner: true,
      view: true,
      created: true,
      _count: {
        select: {
          like: true,
          favorite: true,
          resource: true
        }
      }
    }
  })

  const totalCount = await prisma.galgame.count()

  const galgames: GalgameRankingItem[] = data.map((game) => ({
    id: game.id,
    name: {
      'en-us': game.name_en_us,
      'ja-jp': game.name_ja_jp,
      'zh-cn': game.name_zh_cn,
      'zh-tw': game.name_zh_tw
    },
    banner: game.banner,
    view: game.view,
    created: game.created,
    likeCount: game._count.like,
    favoriteCount: game._count.favorite,
    resourceCount: game._count.resource
  }))

  return { galgames, totalCount }
}

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameRankingSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const result = await getGalgameRanking(input)
  return result
})
