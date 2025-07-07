import prisma from '~/prisma/prisma'
import { getGalgameSchema } from '~/validations/home'
import type { HomeGalgame } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const nsfw = getNSFWCookie(event)

  const skip = (page - 1) * limit

  const where = {
    status: { not: 1 },
    content_limit: nsfw === 'sfw' ? 'sfw' : undefined
  }

  const data = await prisma.galgame.findMany({
    where,
    orderBy: { resource_update_time: 'desc' },
    skip,
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      _count: {
        select: {
          like: true
        }
      },
      resource: {
        select: {
          platform: true,
          language: true
        }
      }
    }
  })

  const galgames: HomeGalgame[] = data.map((galgame) => {
    const platforms = [...new Set(galgame.resource.map((r) => r.platform))]
    const languages = [...new Set(galgame.resource.map((r) => r.language))]

    return {
      id: galgame.id,
      name: {
        'en-us': galgame.name_en_us,
        'ja-jp': galgame.name_ja_jp,
        'zh-cn': galgame.name_zh_cn,
        'zh-tw': galgame.name_zh_tw
      },
      banner: galgame.banner,
      user: galgame.user,
      contentLimit: galgame.content_limit,
      view: galgame.view,
      likeCount: galgame._count.like,
      resourceUpdateTime: galgame.resource_update_time,
      platform: platforms,
      language: languages
    }
  })

  return galgames
})
