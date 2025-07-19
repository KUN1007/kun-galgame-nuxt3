import prisma from '~/prisma/prisma'
import { getTopicSchema } from '~/validations/topic'
import type { TopicCard } from '~/types/api/topic'
import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getTopicSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit, sortField, sortOrder, category } = input

  let orderBy: Prisma.topicOrderByWithRelationInput = {}
  if (
    sortField === 'created' ||
    sortField === 'view' ||
    sortField === 'status_update_time'
  ) {
    orderBy = {
      [sortField]: sortOrder
    }
  } else if (
    sortField === 'like' ||
    sortField === 'favorite' ||
    sortField === 'upvote'
  ) {
    orderBy = {
      [sortField]: {
        _count: sortOrder
      }
    }
  }

  const data = await prisma.topic.findMany({
    where: {
      category: category === 'all' ? undefined : category,
      status: { not: 1 }
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy,
    select: {
      id: true,
      title: true,
      view: true,
      tag: true,
      status: true,
      status_update_time: true,
      upvote_time: true,
      best_answer: true,

      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },

      section: {
        select: {
          topic_section: {
            select: {
              name: true
            }
          }
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

  const topics: TopicCard[] = data.map((topic) => ({
    id: topic.id,
    title: topic.title,
    view: topic.view,
    tag: topic.tag,
    user: topic.user as KunUser,
    status: topic.status,
    hasBestAnswer: !!topic.best_answer,

    likeCount: topic._count.like,
    replyCount: topic._count.reply,
    commentCount: topic._count.comment,

    section: topic.section.map((s) => s.topic_section.name),
    statusUpdateTime: topic.status_update_time,
    upvoteTime: topic.upvote_time
  }))

  return topics
})
