import prisma from '~/prisma/prisma'
import { getGalgamePrDetailSchema } from '~/validations/galgame'
import type { GalgamePRDetails } from '~/types/api/galgame-pr'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgamePrDetailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const pr = await prisma.galgame_pr.findUnique({
    where: { id: input.galgamePrId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      galgame: {
        include: {
          alias: true,
          official: true,
          engine: true,
          tag: true
        }
      }
    }
  })
  if (!pr) {
    return kunError(event, '未找到这个更新请求')
  }

  const details: GalgamePRDetails = {
    id: pr.id,
    galgameId: pr.galgame_id,
    index: pr.index,
    status: pr.status,
    completedTime: pr.completed_time,
    user: pr.user,
    galgame: {
      id: pr.galgame.id,
      name: {
        'en-us': pr.galgame.name_en_us,
        'ja-jp': pr.galgame.name_ja_jp,
        'zh-cn': pr.galgame.name_zh_cn,
        'zh-tw': pr.galgame.name_zh_tw
      },
      introduction: {
        'en-us': pr.galgame.intro_en_us,
        'ja-jp': pr.galgame.intro_ja_jp,
        'zh-cn': pr.galgame.intro_zh_cn,
        'zh-tw': pr.galgame.intro_zh_tw
      },
      contentLimit: pr.galgame.content_limit,
      alias: pr.galgame.alias.map((a) => a.name)
    }
  }

  return details
})
