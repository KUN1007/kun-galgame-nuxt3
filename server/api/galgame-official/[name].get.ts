import prisma from '~/prisma/prisma'
import { getGalgameByOfficialSchema } from '~/validations/galgame-official'
import type { GalgameOfficialDetail, GalgameCard } from '~/types/api/galgame'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameByOfficialSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const data = await prisma.galgame_official.findUnique({
    where: { name: input.name },
    include: {
      alias: true,
      galgame: {
        include: {
          galgame: {
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
          }
        }
      }
    }
  })

  if (!data) {
    return kunError(event, '未找到这个制作会社')
  }

  const result: GalgameOfficialDetail = {
    id: data.id,
    name: data.name,
    link: data.link,
    category: data.category,
    lang: data.lang,
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
