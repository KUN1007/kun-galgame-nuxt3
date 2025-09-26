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
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      alias: {
        select: {
          name: true
        }
      },
      practicality: {
        select: {
          rate: true
        }
      },
      resource: {
        select: {
          id: true,
          type: true,
          size: true,
          download: true,
          status: true
        }
      }
    }
  })

  if (!toolset) {
    return kunError(event, '未找到该工具集')
  }

  const practicalityAvg = toolset.practicality.length
    ? toolset.practicality.reduce((a, b) => a + b.rate, 0) /
      toolset.practicality.length
    : null

  const totalDownload = toolset.resource.reduce(
    (sum, r) => sum + (r.download ?? 0),
    0
  )

  const detail: ToolsetDetail = {
    ...toolset,
    practicalityAvg,
    download: totalDownload,
    aliases: toolset.alias.map((a) => a.name),
    practicalityCount: toolset.practicality.length,
    resource_update_time: toolset.resource_update_time
  }

  return detail
})
