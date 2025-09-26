import { z } from 'zod'

export const getOverviewStatsSchema = z.object({
  days: z.coerce.number().min(1).max(365, '查询范围不能超过 365 天')
})

export const getAdminUserSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(100)
})

export const getAdminUserSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, '搜索词不能为空')
    .max(20, '搜索关键词最大 20 个字符')
})
