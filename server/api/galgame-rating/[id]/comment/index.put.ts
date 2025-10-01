import prisma from '~/prisma/prisma'
import { updateGalgameRatingCommentSchema } from '~/validations/galgame-rating'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, updateGalgameRatingCommentSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '请先登录', 205)
  }

  const comment = await prisma.galgame_rating_comment.findUnique({
    where: { id: input.galgameRatingCommentId },
    include: {
      galgame_rating: {
        select: {
          galgame_id: true,
          user_id: true,
          galgame: { select: { user_id: true } }
        }
      }
    }
  })
  if (!comment) {
    return kunError(event, '评论不存在', 404)
  }

  const user = await prisma.user.findUnique({ where: { id: userInfo.uid } })
  if (!user) {
    return kunError(event, '用户不存在')
  }

  if (comment.user_id !== user.id && user.role < 2) {
    return kunError(event, '无权限编辑该评论', 403)
  }

  await prisma.galgame_rating_comment.update({
    where: { id: input.galgameRatingCommentId },
    data: { content: input.content }
  })

  return 'MOEMOE update galgame rating comment successfully!'
})
