import prisma from '~/prisma/prisma'
import { getToolsetDetailSchema } from '~/validations/toolset'
import type { ToolsetDetail } from '~/types/api/toolset'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getToolsetDetailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const toolset = await prisma.galgame_toolset.findUnique({
    where: { id: input.toolsetId },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      alias: { select: { name: true } },
      practicality: { select: { rate: true } }
    }
  })

  if (!toolset) {
    return kunError(event, '未找到该工具集')
  }

  const practicalityAvg = toolset.practicality.length
    ? toolset.practicality.reduce((a, b) => a + b.rate, 0) /
      toolset.practicality.length
    : null

  const detail: ToolsetDetail = {
    id: toolset.id,
    name: toolset.name,
    type: toolset.type,
    description: toolset.description,
    platform: toolset.platform,
    language: toolset.language,
    version: toolset.version,
    homepage: toolset.homepage,
    download: toolset.download,
    user: toolset.user,
    aliases: toolset.alias.map((a) => a.name),
    practicalityAvg,
    practicalityCount: toolset.practicality.length
  }

  return detail
})
