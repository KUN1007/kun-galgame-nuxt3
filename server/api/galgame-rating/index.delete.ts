import prisma from '~/prisma/prisma'
import { deleteGalgameRatingSchema } from '~/validations/galgame-rating'

export default defineEventHandler(async (event) => {
  const input = kunParseDeleteQuery(event, deleteGalgameRatingSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const rating = await prisma.galgame_rating.findUnique({
    where: { id: input.galgameRatingId },
    include: {
      galgame: { select: { user_id: true } }
    }
  })
  if (!rating) {
    return kunError(event, '未找到评分')
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const user = await prisma.user.findUnique({ where: { id: userInfo.uid } })
  if (!user) {
    return kunError(event, '未找到用户')
  }

  if (
    rating.user_id !== user.id &&
    rating.galgame.user_id !== user.id &&
    user.role < 2
  ) {
    return kunError(event, '没有删除该评分的权限')
  }

  await prisma.galgame_rating.delete({ where: { id: input.galgameRatingId } })

  return 'MOEMOE delete galgame rating successfully!'
})
