import prisma from '~/prisma/prisma'
import { getGalgameSchema } from '~/validations/galgame'
import type { GalgameCard } from '~/types/api/galgame'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const nsfw = getNSFWCookie(event)
  const { page, limit, type, language, platform, sortField, sortOrder } = input

  const skip = (page - 1) * limit

  const resourceFilters = []
  if (type !== 'all') {
    resourceFilters.push({ type })
  }
  if (language !== 'all') {
    resourceFilters.push({ language })
  }
  if (platform !== 'all') {
    resourceFilters.push({ platform })
  }

  const where = {
    status: { not: 1 },
    content_limit: nsfw === 'sfw' ? 'sfw' : undefined,
    resource: {
      some: {
        AND: resourceFilters
      }
    }
  }

  const orderBy = {
    [sortField === 'time' ? 'resource_update_time' : sortField]: sortOrder
  }

  const [totalCount, data] = await Promise.all([
    prisma.galgame.count({ where }),
    prisma.galgame.findMany({
      where,
      orderBy,
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
            like: true,
            favorite: true
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
  ])

  const galgames: GalgameCard[] = data.map((galgame) => {
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

      user: galgame.user as unknown as KunUser,
      contentLimit: galgame.content_limit,
      view: galgame.view,
      likeCount: galgame._count.like,
      favorites: galgame._count.favorite,
      resourceUpdateTime: galgame.resource_update_time,
      platform: platforms,
      language: languages
    }
  })

  return { galgames, totalCount }
})
