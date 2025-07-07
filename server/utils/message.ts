import type { Prisma, PrismaClient } from '@prisma/client'
import type { DefaultArgs } from '~/prisma/client/runtime/library'
import type { MessageType } from '~/types/api/message'

export const createMessage = async (
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  sender_id: number,
  receiver_id: number,
  type: MessageType,
  content: string,
  topicId?: number,
  galgameId?: number
) => {
  const link = topicId ? `/topic/${topicId}` : `/galgame/${galgameId}`

  const newMessage = await prisma.message.create({
    data: {
      sender_id,
      receiver_id,
      type,
      content,
      link
    }
  })

  return newMessage
}

// When user toggle like ans dislike, maybe send a duplicate request
export const createDedupMessage = async (
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  sender_id: number,
  receiver_id: number,
  type: MessageType,
  content: string,
  topicId?: number,
  galgameId?: number
) => {
  const link = topicId ? `/topic/${topicId}` : `/galgame/${galgameId}`

  const duplicatedMessage = await prisma.message.findFirst({
    where: { sender_id, receiver_id, type, content, link }
  })
  if (duplicatedMessage) {
    return
  }

  const newMessage = await prisma.message.create({
    data: {
      sender_id,
      receiver_id,
      type,
      content,
      link
    }
  })

  return newMessage
}
