import prisma from '~/prisma/prisma'
import { deleteReplySchema } from '~/validations/topic'

export default defineEventHandler(async (event) => {
  const input = kunParseDeleteQuery(event, deleteReplySchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const reply = await prisma.topic_reply.findUnique({
    where: { id: input.replyId },
    include: {
      _count: {
        select: {
          comment: true,
          like: true,
          target: true,
          target_by: true
        }
      }
    }
  })
  if (!reply) {
    return kunError(event, '未找到这个回复')
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  if (reply.user_id !== userInfo.uid) {
    return kunError(event, '您无权删除这个回复')
  }

  const moemoepointToDecrease =
    3 *
    (reply._count.comment +
      reply._count.like +
      reply._count.target +
      reply._count.target_by +
      1)
  const user = await prisma.user.findUnique({
    where: { id: userInfo.uid },
    select: { moemoepoint: true }
  })
  if (!user) {
    return kunError(event, '未找到用户')
  }
  if (user.moemoepoint < moemoepointToDecrease) {
    return kunError(
      event,
      `您的萌萌点不足, 删除这个回复需要 ${moemoepointToDecrease} 萌萌点`
    )
  }

  return await prisma.$transaction(async (prisma) => {
    await prisma.topic_reply.delete({
      where: { id: input.replyId }
    })

    await prisma.user.update({
      where: { id: userInfo.uid },
      data: { moemoepoint: { increment: -moemoepointToDecrease } }
    })

    return 'MOEMOE delete reply successfully!'
  })
})
