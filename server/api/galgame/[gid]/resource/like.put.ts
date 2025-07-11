import prisma from '~/prisma/prisma'
import { updateGalgameResourceLikeSchema } from '~/validations/galgame'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, updateGalgameResourceLikeSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const uid = userInfo.uid

  const resource = await prisma.galgame_resource.findUnique({
    where: { id: input.galgameResourceId },
    include: {
      like: {
        where: {
          user_id: uid
        }
      },
      link: {
        select: {
          url: true
        }
      }
    }
  })
  if (!resource) {
    return kunError(event, '未找到该资源')
  }
  if (resource.like.length > 0) {
    return kunError(event, '您已经点赞过这个资源了')
  }

  return await prisma.$transaction(async (prisma) => {
    await prisma.galgame_resource_like.create({
      data: {
        galgame_resource_id: input.galgameResourceId,
        user_id: uid
      }
    })

    await prisma.user.update({
      where: { id: uid },
      data: { moemoepoint: { increment: 1 } }
    })

    await createMessage(
      prisma,
      uid,
      resource.user_id,
      'liked',
      resource.link[0].url.slice(0, 233),
      undefined,
      resource.galgame_id
    )

    return 'MOEMOE like galgame resource operation successfully!'
  })
})
