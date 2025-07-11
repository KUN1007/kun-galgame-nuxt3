import { markdownToText } from '~/utils/markdownToText'
import prisma from '~/prisma/prisma'
import { getActivitySchema } from '~/validations/activity'
import { KUN_ALLOWED_ACTIVITY_TYPE } from '~/constants/activity'
import type { KunActivity } from '~/types/api/activity'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getActivitySchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const { page, limit, type } = input

  const offset = (page - 1) * limit

  const allowedType = [...KUN_ALLOWED_ACTIVITY_TYPE]
  const queryData = type === 'all' ? { type: { in: allowedType } } : { type }

  const totalCount = await prisma.message.count({
    where: queryData
  })
  const data = await prisma.message.findMany({
    where: queryData,
    take: limit,
    skip: offset,
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    }
  })

  const activities: KunActivity[] = data.map((message) => ({
    user: message.sender,
    link: message.link,
    type: message.type,
    content: markdownToText(message.content).slice(0, 50),
    created: message.created
  }))

  return { activities, totalCount }
})
