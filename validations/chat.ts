import { z } from 'zod'

export const deleteMessageSchema = z.object({
  messageId: z.coerce.number().min(1).max(9999999)
})

export const getChatMessageHistorySchema = z.object({
  receiverUid: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30)
})
