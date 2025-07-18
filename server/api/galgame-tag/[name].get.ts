import prisma from '~/prisma/prisma'
import { getGalgameByTagSchema } from '~/validations/galgame-tag'
import type { GalgameTagDetail, GalgameCard } from '~/types/api/galgame'
import type { KUN_GALGAME_TAG_TYPE } from '~/constants/galgameTag'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameByTagSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const data = await prisma.galgame_tag.findUnique({
    where: { name: input.name },
    include: {
      alias: true,
      galgame: {
        include: {
          galgame: {
            include: {
              user: true,
              resource: true,
              _count: {
                select: { like: true }
              }
            }
          }
        }
      }
    }
  })

  if (!data) {
    return kunError(event, '未找到这个标签')
  }

  const result: GalgameTagDetail = {
    id: data.id,
    name: data.name,
    category: data.category as (typeof KUN_GALGAME_TAG_TYPE)[number],
    description: data.description,
    alias: data.alias.map((a) => a.name),
    galgame: data.galgame.map((relation) => {
      const g = relation.galgame
      const platforms = [...new Set(g.resource.map((r) => r.platform))]
      const languages = [...new Set(g.resource.map((r) => r.language))]

      const galgameCard: GalgameCard = {
        id: g.id,
        name: {
          'en-us': g.name_en_us,
          'ja-jp': g.name_ja_jp,
          'zh-cn': g.name_zh_cn,
          'zh-tw': g.name_zh_tw
        },
        banner: g.banner,
        user: g.user,
        contentLimit: g.content_limit,
        view: g.view,
        likeCount: g._count.like,
        platform: platforms,
        language: languages,
        resourceUpdateTime: g.resource_update_time
      }
      return galgameCard
    })
  }

  return result
})
