import prisma from '~/prisma/prisma'
import { getUserTopicSchema } from '~/validations/user'
import type { UserTopic } from '~/types/api/user'
import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getUserTopicSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const userId = userInfo.uid

  const { page, limit, type } = input

  const whereClause: Prisma.topicWhereInput = {}

  switch (type) {
    case 'topic':
      whereClause.user_id = userId
      break

    case 'topic_like':
      whereClause.like = { some: { user_id: userId } }
      break

    case 'topic_upvote':
      whereClause.upvote = { some: { user_id: userId } }
      break

    case 'topic_favorite':
      whereClause.favorite = { some: { user_id: userId } }
      break
  }

  const [topics, totalCount]: [UserTopic[], number] = await prisma.$transaction(
    [
      prisma.topic.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created: 'desc'
        },
        select: {
          id: true,
          title: true,
          created: true
        }
      }),

      prisma.topic.count({ where: whereClause })
    ]
  )

  return {
    topics,
    totalCount
  }
})
