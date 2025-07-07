import prisma from '~/prisma/prisma'
import { updateGalgameResourceSchema } from '~/validations/galgame'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, updateGalgameResourceSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const resource = await prisma.galgame_resource.findFirst({
    where: { id: input.galgameResourceId, user_id: userInfo.uid }
  })
  if (!resource) {
    return kunError(event, '未找到这个 Galgame 资源')
  }

  const { link, galgameId, galgameResourceId, ...rest } = input

  return await prisma.$transaction(async (prisma) => {
    await prisma.galgame_resource.update({
      where: { id: galgameResourceId, user_id: userInfo.uid },
      data: rest
    })

    await prisma.galgame_resource_link.deleteMany({
      where: { galgame_resource_id: galgameResourceId }
    })

    const linksData = link.map((l) => ({
      galgame_resource_id: galgameResourceId,
      url: l
    }))

    await prisma.galgame_resource_link.createMany({
      data: linksData,
      skipDuplicates: true
    })

    return 'MOEMOE update galgame resource operation successfully!'
  })
})
