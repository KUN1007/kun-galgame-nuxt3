import { z } from 'zod'

export const getNoticeMessageSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  type: z
    .enum([
      'upvoted',
      'liked',
      'favorite',
      'replied',
      'commented',
      'expired',
      'requested',
      'merged',
      'declined',
      'mentioned',
      'admin',
      ''
    ])
    .optional(),
  sortOrder: z.enum(['asc', 'desc'])
})
