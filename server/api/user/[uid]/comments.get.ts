import prisma from '~/prisma/prisma'
import { getUserCommentSchema } from '~/validations/user'
import type { Prisma } from '@prisma/client'
import type { UserComment } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getUserCommentSchema)
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

  let whereClause: Prisma.topic_commentWhereInput = {}

  switch (type) {
    case 'comment_created':
      whereClause = {
        user_id: userId
      }
      break

    case 'comment_target':
      whereClause = {
        target_user_id: userId
      }
      break

    case 'comment_like':
      whereClause = {
        like: {
          some: {
            user_id: userId
          }
        }
      }
      break

    default:
      return kunError(event, '无效的类型参数', 400)
  }

  const [comments, totalCount] = await prisma.$transaction([
    prisma.topic_comment.findMany({
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

    prisma.topic_comment.count({
      where: whereClause
    })
  ])

  const formattedComments: UserComment[] = comments.map((comment) => ({
    topicId: comment.topic_id,
    content: comment.content,
    created: comment.created
  }))

  return {
    comments: formattedComments,
    totalCount: totalCount
  }
})
