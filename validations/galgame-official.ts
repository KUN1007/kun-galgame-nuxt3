import { z } from 'zod'
import { KUN_GALGAME_OFFICIAL_TYPE } from '~/constants/galgameOfficial'
import {
  KUN_RESOURCE_LANGUAGE_CONST,
  KUN_RESOURCE_PLATFORM_CONST,
  KUN_RESOURCE_TYPE_CONST
} from '~/constants/galgame'

export const getGalgameOfficialSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(100)
})

export const getGalgameByOfficialSchema = getGalgameOfficialSchema.merge(
  z.object({
    officialId: z.coerce.number().min(1).max(9999999),
    limit: z.coerce.number().min(1).max(24),
    type: z.enum([...KUN_RESOURCE_TYPE_CONST, 'all']),
    language: z.enum([...KUN_RESOURCE_LANGUAGE_CONST, 'all']),
    platform: z.enum([...KUN_RESOURCE_PLATFORM_CONST, 'all']),
    sortField: z.enum(['time', 'created', 'view']),
    sortOrder: z.enum(['asc', 'desc'])
  })
)

export const getGalgameOfficialBySearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, '搜索词不能为空')
    .max(100, '搜索关键词最大 100 个字符')
})

export const updateGalgameOfficialSchema = z.object({
  officialId: z.coerce.number().min(1).max(9999999),
  name: z.string().min(1).max(200, 'Galgame 制作会社名最多 200 个字符'),
  link: z.string().url('请输入有效的链接').max(500, '会社链接最多 500 个字符'),
  category: z.enum(KUN_GALGAME_OFFICIAL_TYPE),
  lang: z.string().max(20).optional().default('ja'),
  description: z
    .string()
    .max(2000, '会社介绍最多 2000 个字符')
    .optional()
    .default(''),
  alias: z
    .array(z.string().min(1).max(100, '标签会社别名最多 100 个字符'))
    .max(20, '标签最多 20 个别名')
    .optional()
    .default([])
})
