import { markdownToText } from '~/utils/markdownToText'
import prisma from '~/prisma/prisma'
import type {
  KunActivityType,
  KunActivityRequestData,
  KunActivity
} from '~/types/api/activity'

const allowedMessageType = ['upvoted', 'replied', 'commented', 'requested']

const getMessages = async (
  page: number,
  limit: number,
  type: KunActivityType
) => {
  const offset = (page - 1) * limit

  const queryData =
    type === 'all' ? { type: { in: allowedMessageType } } : { type }

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
    content:
      message.type === 'requested' && message.content.length < 233
        ? `请求更新: ${Object.values(JSON.parse(message.content)).join(',').slice(0, 50)}`
        : markdownToText(message.content).slice(0, 50),
    created: message.created
  }))

  return { activities, totalCount }
}

export default defineEventHandler(async (event) => {
  const { page, limit, type }: KunActivityRequestData = await getQuery(event)
  if (limit !== '50') {
    return kunError(event, 10209)
  }
  if (!allowedMessageType.concat('all').includes(type)) {
    return kunError(event, 10402)
  }

  const messages = await getMessages(parseInt(page), parseInt(limit), type)

  return messages
})
