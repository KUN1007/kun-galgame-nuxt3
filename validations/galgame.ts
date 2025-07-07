import { z } from 'zod'
import { VNDBPattern, ResourceSizePattern } from '~/utils/pattern'
import {
  KUN_RESOURCE_TYPE_CONST,
  KUN_RESOURCE_LANGUAGE_CONST,
  KUN_RESOURCE_PLATFORM_CONST
} from '~/constants/galgame'

const SORT_ORDER_CONST = ['asc', 'desc'] as const

/*
 * Galgame
 */

export const getGalgameSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(24),
  type: z.enum([...KUN_RESOURCE_TYPE_CONST, 'all']),
  language: z.enum([...KUN_RESOURCE_LANGUAGE_CONST, 'all']),
  platform: z.enum([...KUN_RESOURCE_PLATFORM_CONST, 'all']),
  sortField: z.enum(['time', 'created', 'view']),
  sortOrder: z.enum(SORT_ORDER_CONST)
})

export const getGalgameDetailSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

export const getGalgameDuplicateSchema = z.object({
  vndbId: z
    .string()
    .refine((s) => VNDBPattern.test(s), { message: '非法的 VNDB ID 格式' })
})

export const createGalgameSchema = z.object({
  vndbId: z
    .string()
    .min(2)
    .max(10)
    .refine((value) => VNDBPattern.test(value), {
      message: '非法的 VNDB ID 格式'
    }),
  seriesId: z.coerce.number().min(1).max(9999999).nullable(),
  officialId: z.coerce.number().min(1).max(9999999),
  engineId: z.coerce.number().min(1).max(9999999),
  tagId: z
    .array(z.coerce.number().min(1).max(9999999))
    .min(1)
    .max(107, { message: '每个 Galgame 最多 107 个标签' }),
  name_en_us: z.string().min(1).max(100007, { message: '游戏名称最多 233 字' }),
  name_ja_jp: z.string().min(1).max(100007, { message: '游戏名称最多 233 字' }),
  name_zh_cn: z.string().min(1).max(100007, { message: '游戏名称最多 233 字' }),
  name_zh_tw: z.string().min(1).max(100007, { message: '游戏名称最多 233 字' }),
  intro_en_us: z
    .string()
    .min(1)
    .max(100007, { message: '游戏介绍最多 100007 字' }),
  intro_ja_jp: z
    .string()
    .min(1)
    .max(100007, { message: '游戏介绍最多 100007 字' }),
  intro_zh_cn: z
    .string()
    .min(1)
    .max(100007, { message: '游戏介绍最多 100007 字' }),
  intro_zh_tw: z
    .string()
    .min(1)
    .max(100007, { message: '游戏介绍最多 100007 字' }),
  contentLimit: z.enum(['sfw', 'nsfw']),
  banner: z.unknown()
})

export const updateGalgameBannerSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgameLikeSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgameFavoriteSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

/*
 * Resource
 */

export const getGalgameResourceSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

export const getGalgameResourceDetailSchema = z.object({
  galgameResourceId: z.coerce.number().min(1).max(9999999)
})

export const createGalgameResourceSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  type: z.enum(KUN_RESOURCE_TYPE_CONST),
  link: z
    .array(
      z
        .string()
        .url({ message: '您的资源链接必须是 URL' })
        .min(1)
        .max(1007, { message: '您的每条资源链接最大 1007 个字符' })
    )
    .min(1, { message: '您至少需要有一条资源链接' })
    .max(107, { message: '您最多有 107 条资源链接' }),
  language: z.enum(KUN_RESOURCE_LANGUAGE_CONST),
  platform: z.enum(KUN_RESOURCE_PLATFORM_CONST),
  size: z.string().refine((s) => ResourceSizePattern.test(s), {
    message: '非法的资源大小, 资源大小应该包含 MB 或者 GB'
  }),
  code: z
    .string()
    .max(1007, { message: '资源的提取码不可超过 1007 个字符' })
    .optional()
    .default(''),
  password: z
    .string()
    .max(1007, { message: '资源的解压码不可超过 1007 个字符' })
    .optional()
    .default(''),
  note: z
    .string()
    .max(1007, { message: '资源的备注不可超过 1007 个字符' })
    .optional()
    .default('')
})

export const updateGalgameResourceSchema = createGalgameResourceSchema.merge(
  z.object({
    galgameResourceId: z.coerce.number().min(1).max(9999999)
  })
)

export const updateGalgameResourceLikeSchema = z.object({
  galgameResourceId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgameResourceExpireSchema = z.object({
  galgameResourceId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgameResourceValidSchema = z.object({
  galgameResourceId: z.coerce.number().min(1).max(9999999)
})

export const deleteGalgameResourceSchema = z.object({
  galgameResourceId: z.coerce.number().min(1).max(9999999)
})

/*
 * Comment
 */

export const getGalgameCommentSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  sortOrder: z.enum(SORT_ORDER_CONST)
})

export const createGalgameCommentSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  targetUserId: z.coerce.number().min(1).max(9999999),
  content: z
    .string()
    .min(1)
    .max(1007, { message: 'Galgame 评论最多 1007 个字符' })
})

export const deleteGalgameCommentSchema = z.object({
  galgameCommentId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgameCommentLikeSchema = z.object({
  galgameCommentId: z.coerce.number().min(1).max(9999999)
})

/*
 * Others
 */

export const getGalgameHistorySchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30)
})

export const getGalgameLinkSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

export const createGalgameLinkSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  name: z.string().min(1).max(107, { message: '相关链接名最大 107 个字符' }),
  link: z.string().min(1).max(500, { message: '相关链接的链接最多 500 个字符' })
})

export const deleteGalgameLinkSchema = z.object({
  galgameLinkId: z.coerce.number().min(1).max(9999999)
})

export const getGalgamePrSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30)
})

export const getGalgamePrDetailSchema = z.object({
  galgamePrId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgamePrDeclineSchema = z.object({
  galgamePrId: z.coerce.number().min(1).max(9999999),
  note: z
    .string()
    .min(1)
    .max(1007, { message: '更新请求的拒绝理由最多 1007 个字符' })
})

export const getGalgameSeriesSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})
