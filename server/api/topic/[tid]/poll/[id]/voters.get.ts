import prisma from '~/prisma/prisma'
import { getPollVoterSchema } from '~/validations/topic-poll'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getPollVoterSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const option = await prisma.topic_poll_option.findUnique({
    where: { id: input.option_id },
    include: { poll: true }
  })

  if (!option) {
    return kunError(event, '选项不存在')
  }
  if (option.poll.is_anonymous) {
    return kunError(event, '匿名投票无法查看投票者')
  }

  const votes = await prisma.topic_poll_vote.findMany({
    where: { option_id: input.option_id },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    },
    orderBy: {
      created: 'desc'
    }
  })

  return votes.map((v) => v.user)
})
