import prisma from '~/prisma/prisma'
import { getGalgameResourceDetailSchema } from '~/validations/galgame'
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getGalgameResourceDetailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)

  const data = await prisma.galgame_resource.findUnique({
    where: { id: input.galgameResourceId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      like: {
        where: {
          user_id: userInfo?.uid
        }
      },
      _count: {
        select: { like: true }
      },
      link: {
        select: {
          url: true
        }
      }
    }
  })
  if (!data) {
    return kunError(event, '未找到该 Galgame 资源')
  }

  const resource: GalgameResourceDetails = {
    id: data.id,
    galgameId: data.galgame_id,
    user: data.user,
    type: data.type,
    language: data.language,
    platform: data.platform,
    size: data.size,
    status: data.status,
    link: data.link.map((l) => l.url),
    code: data.code,
    password: data.password,
    note: data.note,
    likeCount: data._count.like,
    isLike: data.like.length > 0,
    created: data.created
  }

  return resource
})
