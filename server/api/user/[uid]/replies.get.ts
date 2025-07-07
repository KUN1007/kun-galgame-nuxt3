import prisma from '~/prisma/prisma'
import { getUserReplySchema } from '~/validations/user'
import type { Prisma } from '@prisma/client'
import type { UserReply } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getUserReplySchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const userId = userInfo.uid

  const { page, limit, type } = input
  const skip = (page - 1) * limit

  let whereClause: Prisma.topic_replyWhereInput = {}

  switch (type) {
    case 'reply_created':
      whereClause = {
        user_id: userId
      }
      break
    case 'reply_like':
      whereClause = {
        like: {
          some: {
            user_id: userId
          }
        }
      }
      break
    case 'reply_target':
      whereClause = {
        target: {
          some: {
            target_reply: {
              user_id: userId
            }
          }
        }
      }
      break
    default:
      return kunError(event, '无效的类型参数', 400)
  }

  const [replies, totalCount] = await prisma.$transaction([
    prisma.topic_reply.findMany({
      where: whereClause,
      select: {
        topic_id: true,
        content: true,
        created: true
      },
      orderBy: {
        created: 'desc'
      },
      skip: skip,
      take: limit
    }),

    prisma.topic_reply.count({
      where: whereClause
    })
  ])

  const formattedReplies: UserReply[] = replies.map((reply) => ({
    topicId: reply.topic_id,
    content: reply.content,
    created: reply.created
  }))

  return {
    replies: formattedReplies,
    totalCount: totalCount
  }
})
