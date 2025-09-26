import { z } from 'zod'

export const getSearchResultSchema = z.object({
  keywords: z
    .string()
    .trim()
    .min(1, { message: '搜索关键词最少 1 个字符' })
    .max(107, { message: '搜索字符串最大 107 个字符' }),
  type: z.enum(['topic', 'galgame', 'user', 'reply', 'comment']),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(12)
})
