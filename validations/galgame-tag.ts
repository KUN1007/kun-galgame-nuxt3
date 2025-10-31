import { z } from 'zod'
import { KUN_GALGAME_TAG_TYPE } from '~/constants/galgameTag'
import {
  KUN_RESOURCE_LANGUAGE_CONST,
  KUN_RESOURCE_PLATFORM_CONST,
  KUN_RESOURCE_TYPE_CONST
} from '~/constants/galgame'

export const getGalgameTagSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(100)
})

export const getGalgameByTagSchema = getGalgameTagSchema.merge(
  z.object({
    tagId: z.coerce.number().min(1).max(9999999),
    limit: z.coerce.number().min(1).max(24),
    type: z.enum([...KUN_RESOURCE_TYPE_CONST, 'all']),
    language: z.enum([...KUN_RESOURCE_LANGUAGE_CONST, 'all']),
    platform: z.enum([...KUN_RESOURCE_PLATFORM_CONST, 'all']),
    sortField: z.enum(['time', 'created', 'view']),
    sortOrder: z.enum(['asc', 'desc'])
  })
)

export const getGalgameTagBySearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, '搜索词不能为空')
    .max(100, '搜索关键词最大 100 个字符')
})

export const updateGalgameTagSchema = z.object({
  tagId: z.coerce.number().min(1).max(9999999),
  name: z.string().min(1).max(100, '标签名最多 100 个字符'),
  description: z
    .string()
    .max(1000, '标签介绍最多 1000 个字符')
    .optional()
    .default(''),
  category: z.enum(KUN_GALGAME_TAG_TYPE),
  alias: z
    .array(z.string().min(1).max(100, '标签别名最多 100 个字符'))
    .max(20, '标签最多 20 个别名')
    .optional()
    .default([])
})

const numberArrayFromQuery = z.preprocess(
  (v) => {
    if (Array.isArray(v)) {
      return v.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0)
    }
    if (typeof v === 'string') {
      return v
        .split(',')
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isFinite(n) && n > 0)
    }
    return []
  },
  z.array(z.number().int().min(1)).min(1)
)

export const getGalgameByTagsSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(24),
  tagIds: numberArrayFromQuery
})
