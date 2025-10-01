import prisma from '~/prisma/prisma'
import { updateGalgameRatingSchema } from '~/validations/galgame-rating'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, updateGalgameRatingSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const rating = await prisma.galgame_rating.findUnique({
    where: { id: input.galgameRatingId },
    select: { id: true, user_id: true }
  })
  if (!rating) {
    return kunError(event, '评分不存在')
  }
  if (rating.user_id !== userInfo.uid) {
    return kunError(event, '您无权限修改他人评分')
  }

  const { galgameRatingId, galgameType, ...rest } = input

  await prisma.galgame_rating.update({
    where: { id: galgameRatingId },
    data: {
      ...rest,
      galgame_type: galgameType ?? undefined
    }
  })

  return 'MOEMOE update galgame rating successfully!'
})
