import prisma from '~/prisma/prisma'
import { createGalgameRatingCommentSchema } from '~/validations/galgame-rating'

export default defineEventHandler(async (event) => {
  const input = await kunParsePostBody(event, createGalgameRatingCommentSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const rating = await prisma.galgame_rating.findUnique({
    where: { id: input.galgameRatingId },
    select: { galgame_id: true }
  })
  if (!rating) {
    return kunError(event, '未找到这个评分')
  }

  const { galgameRatingId, targetUserId, content } = input

  return prisma.$transaction(async (prisma) => {
    await prisma.galgame_rating_comment.create({
      data: {
        galgame_rating_id: galgameRatingId,
        target_user_id: targetUserId,
        content,
        user_id: userInfo.uid
      }
    })

    if (userInfo.uid !== targetUserId) {
      await prisma.user.update({
        where: { id: targetUserId },
        data: { moemoepoint: { increment: 1 } }
      })

      await createMessage(
        prisma,
        userInfo.uid,
        targetUserId,
        'commented',
        content.slice(0, 233),
        undefined,
        rating.galgame_id
      )
    }

    return 'MOEMOE publish galgame rating comment successfully!'
  })
})
