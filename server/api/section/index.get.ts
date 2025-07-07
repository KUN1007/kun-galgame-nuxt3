import prisma from '~/prisma/prisma'
import { getSectionSchema } from '~/validations/section'
import type { z } from 'zod'
import type { SectionTopic } from '~/types/api/section'

const getSectionTopic = async (input: z.infer<typeof getSectionSchema>) => {
  const { section, page, limit, sortOrder } = input
  const skip = (page - 1) * limit

  const totalCount = await prisma.topic.count({
    where: {
      status: {
        not: 1
      },
      section: {
        some: {
          topic_section: {
            name: section
          }
        }
      }
    }
  })

  const data = await prisma.topic.findMany({
    skip,
    take: limit,
    orderBy: { created: sortOrder },
    where: {
      status: {
        not: 1
      },
      section: {
        some: {
          topic_section: {
            name: section
          }
        }
      }
    },
    include: {
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

  const topics: SectionTopic[] = data.map((topic) => ({
    id: topic.id,
    title: topic.title,
    content: topic.content.slice(0, 233),
    section: topic.section.map((s) => s.topic_section.name),
    tag: topic.tag,
    view: topic.view,
    like: topic._count.like,
    reply: topic._count.reply,
    user: topic.user,
    created: topic.created
  }))

  return { topics, totalCount }
}

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getSectionSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const res = await getSectionTopic(input)

  return res
})
