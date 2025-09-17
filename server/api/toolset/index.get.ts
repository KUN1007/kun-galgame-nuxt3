import prisma from '~/prisma/prisma'
import { getToolsetSchema } from '~/validations/toolset'
import type { ToolsetCard } from '~/types/api/toolset'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getToolsetSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const skip = (page - 1) * limit

  const [totalCount, data] = await Promise.all([
    prisma.galgame_toolset.count({ where: { status: { not: 1 } } }),
    prisma.galgame_toolset.findMany({
      where: { status: { not: 1 } },
      orderBy: { updated: 'desc' },
      skip,
      take: limit,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        comment: { select: { id: true } },
        practicality: { select: { rate: true } }
      }
    })
  ])

  const items: ToolsetCard[] = data.map((t) => {
    const practicalityAvg = t.practicality.length
      ? t.practicality.reduce((a, b) => a + b.rate, 0) / t.practicality.length
      : null
    return {
      id: t.id,
      name: t.name,
      description: t.description,
      user: t.user,
      type: t.type,
      platform: t.platform,
      language: t.language,
      version: t.version,
      download: t.download,
      commentCount: t.comment.length,
      practicalityAvg
    }
  })

  return { items, totalCount }
})
