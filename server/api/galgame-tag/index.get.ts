import prisma from '~/prisma/prisma'
import { getGalgameTagSchema } from '~/validations/galgame-tag'
import type { GalgameTagItem } from '~/types/api/galgame-tag'
import type { KunGalgameTagCategory } from '~/constants/galgameTag'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameTagSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const skip = (page - 1) * limit

  const [data, totalCount] = await Promise.all([
    prisma.galgame_tag.findMany({
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            galgame: true
          }
        }
      },
      orderBy: {
        galgame: {
          _count: 'desc'
        }
      }
    }),
    prisma.galgame_tag.count()
  ])

  const tags: GalgameTagItem[] = data.map((tag) => ({
    id: tag.id,
    name: tag.name,
    category: tag.category as KunGalgameTagCategory,
    galgameCount: tag._count.galgame
  }))

  return { tags, totalCount }
})
