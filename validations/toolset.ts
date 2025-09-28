import { z } from 'zod'
import { ResourceSizePattern } from '~/utils/pattern'
import {
  KUN_TOOLSET_TYPE_CONST,
  KUN_TOOLSET_LANGUAGE_CONST,
  KUN_TOOLSET_PLATFORM_CONST,
  KUN_TOOLSET_VERSION_CONST
} from '~/constants/toolset'

export const getToolsetSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(24),
  type: z.enum([...KUN_TOOLSET_TYPE_CONST, 'all']),
  language: z.enum([...KUN_TOOLSET_LANGUAGE_CONST, 'all']),
  platform: z.enum([...KUN_TOOLSET_PLATFORM_CONST, 'all']),
  version: z.enum([...KUN_TOOLSET_VERSION_CONST, 'all']),
  sortField: z.enum(['resource_update_time', 'created', 'view']),
  sortOrder: z.enum(['asc', 'desc'])
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
  homepage: z.array(z.string().url().max(500)).default([]),
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

// Toolset resource & upload
export const getToolsetResourceDetailSchema = z.object({
  toolsetResourceId: z.coerce.number().min(1).max(9999999)
})

export const createToolsetResourceSchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999),
  salt: z.string().max(7).optional().default(''),
  content: z.string().max(1007).optional().default(''),
  size: z.string().refine((s) => ResourceSizePattern.test(s), {
    message: '大小格式不正确, 需要包含 KB, MB, GB'
  }),
  code: z.string().max(1007).optional().default(''),
  password: z.string().max(1007).optional().default(''),
  note: z.string().max(1007).optional().default('')
})

export const updateToolsetResourceSchema = z.object({
  toolsetResourceId: z.coerce.number().min(1).max(9999999),
  content: z.string().max(1007).optional().default(''),
  size: z.string().refine((s) => ResourceSizePattern.test(s), {
    message: '大小格式不正确, 需要包含 KB, MB, GB'
  }),
  code: z.string().max(1007).optional().default(''),
  password: z.string().max(1007).optional().default(''),
  note: z.string().max(1007).optional().default('')
})

export const deleteToolsetResourceSchema = z.object({
  toolsetResourceId: z.coerce.number().min(1).max(9999999)
})

export const initToolsetUploadSchema = z.object({
  toolsetId: z.coerce.number().min(1).max(9999999),
  filename: z
    .string()
    .min(1)
    .max(1007)
    .regex(/\.(7z|zip|rar)$/i, {
      message: '文件名必须以 .7z, .zip 或 .rar 结尾'
    }),
  filesize: z.coerce.number().int().positive()
})

export const completeToolsetUploadSchema = z.object({
  salt: z.string().min(7).max(7),
  uploadId: z.string().optional(),
  parts: z
    .array(z.object({ PartNumber: z.number().int().min(1), ETag: z.string() }))
    .optional()
})

export const abortToolsetUploadSchema = z.object({
  salt: z.string().min(7).max(7),
  uploadId: z.string().min(1)
})
