import prisma from '~/prisma/prisma'
import type { TopicRSS } from '~/types/api/rss'

export default defineEventHandler(async (event) => {
  const data = await prisma.topic.findMany({
    orderBy: {
      created: 'desc'
    },
    take: 10,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    }
  })

  const topics: TopicRSS[] = data.map((topic) => ({
    id: topic.id,
    name: topic.title,
    user: topic.user,
    description: topic.content.slice(0, 233),
    created: topic.created
  }))

  return topics
})
