import prisma from '~/prisma/prisma'
import { getGalgameResourceSchema } from '~/validations/home'
import type { HomeGalgameResources } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameResourceSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const userInfo = await getCookieTokenInfo(event)

  const skip = (page - 1) * limit

  const resources = await prisma.galgame_resource.findMany({
    skip,
    take: limit,
    include: {
      like: {
        where: {
          user_id: userInfo?.uid
        }
      },
      _count: {
        select: { like: true }
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      galgame: {
        select: {
          name_en_us: true,
          name_ja_jp: true,
          name_zh_cn: true,
          name_zh_tw: true
        }
      }
    },
    orderBy: { created: 'desc' }
  })

  const data: HomeGalgameResources[] = resources.map((resource) => ({
    id: resource.id,
    galgameId: resource.galgame_id,
    user: resource.user,
    type: resource.type,
    language: resource.language,
    platform: resource.platform,
    size: resource.size,
    status: resource.status,
    likeCount: resource._count.like,
    isLike: resource.like.length > 0,
    created: resource.created,

    galgameName: {
      'en-us': resource.galgame.name_en_us,
      'ja-jp': resource.galgame.name_ja_jp,
      'zh-cn': resource.galgame.name_zh_cn,
      'zh-tw': resource.galgame.name_zh_tw
    }
  }))

  return data
})
