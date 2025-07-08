import { subMonths } from 'date-fns'
import prisma from '~/prisma/prisma'
import { getTopicSchema } from '~/validations/home'
import type { HomeTopic } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getTopicSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const skip = (page - 1) * limit

  const data = await prisma.topic.findMany({
    skip,
    take: limit,
    where: { status: { not: 1 }, created: { gte: subMonths(new Date(), 3) } },
    orderBy: { status_update_time: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      section: {
        include: {
          topic_section: true
        }
      },
      _count: {
        select: {
          like: true,
          reply: true,
          comment: true
        }
      }
    }
  })

  const topics: HomeTopic[] = data.map((topic) => ({
    id: topic.id,
    title: topic.title,
    view: topic.view,
    likeCount: topic._count.like,
    replyCount: topic._count.reply,
    commentCount: topic._count.comment,
    tag: topic.tag,
    section: topic.section.map((s) => s.topic_section.name),
    user: topic.user,
    status: topic.status,
    upvoteTime: topic.upvote_time,
    statusUpdateTime: topic.status_update_time
  }))

  return topics
})
