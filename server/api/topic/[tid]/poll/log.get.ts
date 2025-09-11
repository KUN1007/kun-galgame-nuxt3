import prisma from '~/prisma/prisma'
import { getPollLogSchema } from '~/validations/topic-poll'
import type { TopicPollVoteLog } from '~/types/api/topic-poll'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getPollLogSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const skip = (page - 1) * limit

  const [data, totalCount] = await Promise.all([
    prisma.topic_poll_vote.findMany({
      where: { poll_id: input.poll_id },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        option: {
          select: {
            text: true
          }
        }
      }
    }),
    prisma.topic_poll_vote.count({ where: { poll_id: input.poll_id } })
  ])

  const logs: TopicPollVoteLog[] = data.map((l) => ({
    id: l.id,
    created: l.created,
    user: l.user,
    option: l.option.text
  }))

  return { logs, totalCount }
})
