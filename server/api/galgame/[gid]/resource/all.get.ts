import prisma from '~/prisma/prisma'
import { getGalgameResourceSchema } from '~/validations/galgame'
import type { GalgameResource } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameResourceSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)

  const data = await prisma.galgame_resource.findMany({
    where: { galgame_id: input.galgameId },
    include: {
      like: {
        where: {
          user_id: userInfo?.uid
        }
      },
      _count: {
        select: { like: true }
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    },
    orderBy: { created: 'desc' }
  })

  const galgames: GalgameResource[] = data.map((resource) => ({
    id: resource.id,
    galgameId: resource.galgame_id,
    user: resource.user,
    type: resource.type,
    language: resource.language,
    platform: resource.platform,
    size: resource.size,
    status: resource.status,
    likeCount: resource._count.like,
    isLiked: resource.like.length > 0,
    created: resource.created
  }))

  return galgames
})
