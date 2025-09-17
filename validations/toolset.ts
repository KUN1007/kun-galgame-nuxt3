import { z } from 'zod'
import {
  KUN_TOOLSET_TYPE_CONST,
  KUN_TOOLSET_LANGUAGE_CONST,
  KUN_TOOLSET_PLATFORM_CONST,
  KUN_TOOLSET_VERSION_CONST
} from '~/constants/toolset'

export const getToolsetSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50)
})

export const getToolsetDetailSchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999)
})

export const createToolsetSchema = z.object({
  name: z.string().min(1).max(500),
  description: z.string().max(2000).default(''),
  language: z.enum(KUN_TOOLSET_LANGUAGE_CONST, { message: '非法的语言' }),
  platform: z.enum(KUN_TOOLSET_PLATFORM_CONST, { message: '非法的平台' }),
  type: z.enum(KUN_TOOLSET_TYPE_CONST, { message: '非法的工具类型' }),
  version: z.enum(KUN_TOOLSET_VERSION_CONST, { message: '非法的版本类型' }),
  homepage: z.array(z.string().url()).default([]),
  aliases: z.array(z.string().min(1).max(500)).default([])
})

export const updateToolsetSchema = createToolsetSchema.merge(
  z.object({
    toolsetId: z.coerce.number().min(1).max(9999999)
  })
)

export const deleteToolsetDetailSchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999)
})

export const getToolsetPracticalitySchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999)
})

export const updateToolsetPracticalitySchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999),
  rate: z.coerce.number().min(1).max(5)
})

// Toolset comment
export const getToolsetCommentSchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  sortOrder: z.enum(['asc', 'desc'])
})

export const createToolsetCommentSchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999),
  content: z.string().min(1).max(1007),
  parentId: z.coerce.number().min(1).optional().nullable()
})

export const updateToolsetCommentSchema = z.object({
  commentId: z.coerce.number().min(1).max(9999999),
  content: z.string().min(1).max(1007)
})

export const deleteToolsetCommentSchema = z.object({
  commentId: z.coerce.number().min(1).max(9999999)
})
