import { markdownToText } from '~/utils/markdownToText'
import prisma from '~/prisma/prisma'
import { getMessageSchema } from '~/validations/home'
import type { KunActivity } from '~/types/api/activity'

const allowedMessageType = ['upvoted', 'replied', 'commented', 'requested']

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getMessageSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const skip = (page - 1) * limit

  const data = await prisma.message.findMany({
    where: {
      type: { in: allowedMessageType }
    },
    take: limit,
    skip,
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

  const messages: KunActivity[] = data.map((message) => ({
    user: message.sender,
    link: message.link,
    type: message.type,
    content:
      message.type === 'requested' && message.content.length < 233
        ? `请求更新: ${Object.values(JSON.parse(message.content)).join(',').slice(0, 50)}`
        : markdownToText(message.content).slice(0, 50),
    created: message.created
  }))

  return messages
})
