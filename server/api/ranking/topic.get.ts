import prisma from '~/prisma/prisma'
import { getTopicRankingSchema } from '~/validations/ranking'
import type { z } from 'zod'
import type { TopicRankingItem } from '~/types/api/ranking'

const getTopicRanking = async (
  input: z.infer<typeof getTopicRankingSchema>
) => {
  const { page, limit, sortField, sortOrder } = input
  const skip = (page - 1) * limit

  const topics = await prisma.topic.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortField]: sortOrder
    },
    select: {
      id: true,
      title: true,
      view: true,
      created: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      _count: {
        select: {
          upvote: true,
          like: true,
          reply: true,
          comment: true
        }
      }
    }
  })

  const totalCount = await prisma.topic.count()

  const items: TopicRankingItem[] = topics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    view: topic.view,
    created: topic.created,
    user: topic.user,
    upvoteCount: topic._count.upvote,
    likeCount: topic._count.like,
    replyCount: topic._count.reply,
    commentCount: topic._count.comment
  }))

  return { items, totalCount }
}

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getTopicRankingSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const result = await getTopicRanking(input)
  return result
})
