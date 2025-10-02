import prisma from '~/prisma/prisma'
import { getUserGalgameResourceSchema } from '~/validations/user'
import type { UserGalgameResource } from '~/types/api/user'
import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getUserGalgameResourceSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { userId, page, limit, type } = input
  const skip = (page - 1) * limit

  let whereClause: Prisma.galgame_resourceWhereInput = {}

  switch (type) {
    case 'valid':
      whereClause = {
        user_id: userId,
        status: 0
      }
      break
    case 'expire':
      whereClause = {
        user_id: userId,
        status: 1
      }
      break
    case 'galgame_resource_like':
      whereClause = {
        like: {
          some: {
            user_id: userId
          }
        }
      }
      break
    default:
      return kunError(event, '无效的类型参数', 400)
  }

  const [resources, totalCount] = await prisma.$transaction([
    prisma.galgame_resource.findMany({
      where: whereClause,

      select: {
        galgame_id: true,
        platform: true,
        status: true,
        created: true,
        galgame: {
          select: {
            name_en_us: true,
            name_ja_jp: true,
            name_zh_cn: true,
            name_zh_tw: true
          }
        }
      },
      orderBy: {
        created: 'desc'
      },
      skip: skip,
      take: limit
    }),

    prisma.galgame_resource.count({
      where: whereClause
    })
  ])

  const formattedResources: UserGalgameResource[] = resources.map((res) => ({
    galgameId: res.galgame_id,
    galgameName: {
      'en-us': res.galgame.name_en_us,
      'ja-jp': res.galgame.name_ja_jp,
      'zh-cn': res.galgame.name_zh_cn,
      'zh-tw': res.galgame.name_zh_tw
    },
    platform: res.platform,
    status: res.status,
    created: res.created
  }))

  return {
    resources: formattedResources,
    totalCount: totalCount
  }
})
