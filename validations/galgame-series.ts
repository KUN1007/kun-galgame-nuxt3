import { z } from 'zod'

export const getSeriesGalgameNameSchema = z.object({
  ids: z.array(z.coerce.number().min(1).max(9999999)).min(1).max(200)
})

export const getSeriesDetailSchema = z.object({
  seriesId: z.coerce.number().min(1).max(9999999)
})

export const getSearchResultSchema = z.object({
  keywords: z
    .string()
    .trim()
    .min(1, { message: '搜索关键词最少 1 个字符' })
    .max(107, { message: '搜索字符串最大 107 个字符' })
})

export const createGalgameSeriesSchema = z.object({
  name: z.string().min(1).max(200, '系列名最多 200 个字符'),
  description: z
    .string()
    .max(1000, '系列介绍最多 1000 个字符')
    .optional()
    .default(''),
  galgameIds: z
    .array(z.coerce.number().min(1).max(9999999))
    .min(2, '一个系列最少 2 个 Galgame')
    .max(200, '一个系列最多 200 个 Galgame')
})

export const updateGalgameSeriesSchema = createGalgameSeriesSchema.merge(
  z.object({
    seriesId: z.coerce.number().min(1).max(9999999)
  })
)

export const deleteGalgameSeriesSchema = z.object({
  seriesId: z.coerce.number().min(1).max(9999999)
})

export const getGalgameSeriesSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(12)
})
