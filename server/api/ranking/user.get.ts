import prisma from '~/prisma/prisma'
import { getUserRankingSchema } from '~/validations/ranking'
import type { z } from 'zod'
import type { UserRankingItem } from '~/types/api/ranking'

const getUserRanking = async (input: z.infer<typeof getUserRankingSchema>) => {
  const { page, limit, sortField, sortOrder } = input
  const skip = (page - 1) * limit

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortField]: sortOrder
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      bio: true,
      moemoepoint: true,
      created: true,

      _count: {
        select: {
          topic: true,
          reply_created: true,
          comment_created: true,
          topic_like: true,
          topic_upvote: true
        }
      }
    }
  })

  const totalCount = await prisma.user.count()

  const items: UserRankingItem[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    moemoepoint: user.moemoepoint,
    created: user.created,
    topicCount: user._count.topic,
    replyCount: user._count.reply_created,
    commentCount: user._count.comment_created,
    likeCount: user._count.topic_like,
    upvoteCount: user._count.topic_upvote
  }))

  return { items, totalCount }
}

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getUserRankingSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const result = await getUserRanking(input)
  return result
})
