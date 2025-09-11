import prisma from '~/prisma/prisma'
import { createPollOptionSchema } from '~/validations/topic-poll'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }

  const input = await kunParsePostBody(event, createPollOptionSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const poll = await prisma.topic_poll.findUnique({
    where: { id: input.poll_id },
    include: { topic: true }
  })
  if (!poll) {
    return kunError(event, '投票不存在')
  }
  if (poll.topic.user_id !== userInfo.uid && userInfo.role <= 2) {
    return kunError(event, '您没有权限添加选项')
  }

  const newOption = await prisma.topic_poll_option.create({
    data: {
      text: input.text,
      poll_id: input.poll_id
    }
  })

  return newOption
})
