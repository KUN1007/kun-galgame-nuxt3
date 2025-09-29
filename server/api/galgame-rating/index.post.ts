import prisma from '~/prisma/prisma'
import { createGalgameRatingSchema } from '~/validations/galgame-rating'

export default defineEventHandler(async (event) => {
  const input = await kunParsePostBody(event, createGalgameRatingSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const { galgameId, galgameType, ...rest } = input

  const existed = await prisma.galgame_rating.findFirst({
    where: { galgame_id: galgameId, user_id: userInfo.uid }
  })
  if (existed) {
    return kunError(event, '您已经发布过该 Galgame 的评分了')
  }

  await prisma.galgame_rating.create({
    data: {
      galgame_id: galgameId,
      user_id: userInfo.uid,
      galgame_type: galgameType,
      ...rest
    }
  })

  return 'MOEMOE publish galgame rating successfully!'
})
