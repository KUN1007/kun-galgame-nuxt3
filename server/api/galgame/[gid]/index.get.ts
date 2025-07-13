import prisma from '~/prisma/prisma'
import { getGalgameDetailSchema } from '~/validations/galgame'
import type { GalgameDetail, GalgameTag } from '~/types/api/galgame'
import type { GalgameSeries, GalgameSample } from '~/types/api/series'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameDetailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const galgameId = input.galgameId

  const galgameStatus = await prisma.galgame.findUnique({
    where: { id: galgameId },
    select: { status: true }
  })
  if (!galgameStatus) {
    return kunError(event, '未找到这个 Galgame')
  }
  if (galgameStatus.status === 1) {
    return 'banned'
  }

  const userInfo = await getCookieTokenInfo(event)
  const userId = userInfo?.uid

  const [galgame] = await Promise.all([
    prisma.galgame.findUnique({
      where: { id: galgameId },
      include: {
        like: { where: { user_id: userId } },
        favorite: { where: { user_id: userId } },
        _count: {
          select: { like: true, favorite: true }
        },
        user: {
          select: { id: true, name: true, avatar: true }
        },
        contributor: {
          select: {
            user: {
              select: { id: true, name: true, avatar: true }
            }
          }
        },
        alias: { select: { name: true } },
        series: {
          include: {
            _count: {
              select: {
                galgame: true
              }
            },
            galgame: {
              select: {
                content_limit: true,
                name_en_us: true,
                name_ja_jp: true,
                name_zh_cn: true,
                name_zh_tw: true,
                banner: true
              },
              take: 5,
              orderBy: {
                created: 'asc'
              }
            }
          }
        },
        official: {
          select: { official: { select: { id: true, name: true } } }
        },
        engine: {
          select: { engine: { select: { id: true, name: true } } }
        },
        tag: {
          select: { tag: { select: { id: true, name: true, category: true } } }
        },
        resource: {
          select: { type: true, language: true, platform: true }
        }
      }
    }),

    prisma.galgame.update({
      where: { id: galgameId },
      data: { view: { increment: 1 } }
    })
  ])
  if (!galgame) {
    return kunError(event, '未找到 Galgame')
  }

  const [introHtmlEn, introHtmlJa, introHtmlZhCn, introHtmlZhTw] =
    await Promise.all([
      markdownToHtml(galgame.intro_en_us),
      markdownToHtml(galgame.intro_ja_jp),
      markdownToHtml(galgame.intro_zh_cn),
      markdownToHtml(galgame.intro_zh_tw)
    ])

  const sampleGalgame: GalgameSample[] = galgame.series
    ? galgame.series.galgame.map((g) => ({
        banner: g.banner,
        name: {
          'en-us': g.name_en_us,
          'ja-jp': g.name_ja_jp,
          'zh-cn': g.name_zh_cn,
          'zh-tw': g.name_zh_tw
        }
      }))
    : []
  const isSeriesNSFW = galgame.series
    ? galgame.series.galgame.some((g) => g.content_limit === 'nsfw')
    : false
  const galgameSeries: GalgameSeries | null = galgame.series
    ? {
        id: galgame.series.id,
        name: galgame.series.name,
        description: galgame.series.description,
        isNSFW: isSeriesNSFW,
        sampleGalgame,
        galgameCount: galgame.series._count.galgame,
        created: galgame.series.created,
        updated: galgame.series.updated
      }
    : null

  const data: GalgameDetail = {
    id: galgame.id,
    vndbId: galgame.vndb_id,
    user: galgame.user,
    contentLimit: galgame.content_limit,
    name: {
      'en-us': galgame.name_en_us,
      'ja-jp': galgame.name_ja_jp,
      'zh-cn': galgame.name_zh_cn,
      'zh-tw': galgame.name_zh_tw
    },
    banner: galgame.banner,
    introduction: {
      'en-us': introHtmlEn,
      'ja-jp': introHtmlJa,
      'zh-cn': introHtmlZhCn,
      'zh-tw': introHtmlZhTw
    },
    markdown: {
      'en-us': galgame.intro_en_us,
      'ja-jp': galgame.intro_ja_jp,
      'zh-cn': galgame.intro_zh_cn,
      'zh-tw': galgame.intro_zh_tw
    },
    resourceUpdateTime: galgame.resource_update_time,
    view: galgame.view,
    originalLanguage: galgame.original_language,
    ageLimit: galgame.age_limit,
    type: [...new Set(galgame.resource.map((r) => r.type))],
    platform: [...new Set(galgame.resource.map((r) => r.platform))],
    language: [...new Set(galgame.resource.map((r) => r.language))],
    contributor: galgame.contributor.map((c) => c.user),
    likeCount: galgame._count.like,
    isLiked: galgame.like.length > 0,
    favoriteCount: galgame._count.favorite,
    isFavorited: galgame.favorite.length > 0,
    alias: galgame.alias.map((a) => a.name),
    series: galgameSeries,
    engine: galgame.engine.map((e) => e.engine),
    official: galgame.official.map((o) => o.official),
    tag: galgame.tag.map((t) => t.tag as GalgameTag),
    created: galgame.created,
    updated: galgame.updated
  }

  return data
})
