import { z } from 'zod'
import { VNDBPattern, ResourceSizePattern } from '~/utils/pattern'
import {
  KUN_RESOURCE_TYPE_CONST,
  KUN_RESOURCE_LANGUAGE_CONST,
  KUN_RESOURCE_PLATFORM_CONST
} from '~/constants/galgame'
import { PROVIDER_KEY_OPTIONS } from '~/constants/galgameResource'

const SORT_ORDER_CONST = ['asc', 'desc'] as const

/*
 * Galgame
 */

const ProviderEnum = z.enum(PROVIDER_KEY_OPTIONS)

// helper: coerce query param (string | string[] | undefined) -> ProviderKey[]
const providerQueryArray = z.preprocess((v) => {
  if (Array.isArray(v)) {
    return v
  }
  if (typeof v === 'string') {
    if (!v) return []
    return v.split(',')
  }
  return []
}, z.array(ProviderEnum).default([]))

export const getGalgameSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(24),
  type: z.enum([...KUN_RESOURCE_TYPE_CONST, 'all']),
  language: z.enum([...KUN_RESOURCE_LANGUAGE_CONST, 'all']),
  platform: z.enum([...KUN_RESOURCE_PLATFORM_CONST, 'all']),
  sortField: z.enum(['time', 'created', 'view']),
  sortOrder: z.enum(SORT_ORDER_CONST),
  includeProviders: providerQueryArray,
  excludeOnlyProviders: providerQueryArray
})

export const getGalgameDetailSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})

export const getGalgameDuplicateSchema = z.object({
  vndbId: z
    .string()
    .refine((s) => VNDBPattern.test(s), { message: '非法的 VNDB ID 格式' })
})

export const createGalgameSchema = z
  .object({
    vndbId: z
      .string()
      .min(2)
      .max(10)
      .refine((value) => VNDBPattern.test(value), {
        message: '非法的 VNDB ID 格式'
      }),
    name_en_us: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    name_ja_jp: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    name_zh_cn: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    name_zh_tw: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    intro_en_us: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    intro_ja_jp: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    intro_zh_cn: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    intro_zh_tw: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    contentLimit: z.enum(['sfw', 'nsfw']),
    aliases: z.string().default(''),
    banner: z.unknown()
  })
  .superRefine((data, ctx) => {
    const aliasArray = data.aliases.split(',')
    const isAliasLengthValid = aliasArray.length < 30
    if (!isAliasLengthValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Galgame 最多有 30 个别名',
        path: ['aliases']
      })
    }
    const hasInvalidAlias = aliasArray.some((a) => a.length > 500)
    if (hasInvalidAlias) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '每个 Galgame 别名最多 500 个字符',
        path: ['aliases']
      })
    }

    const hasAtLeastOneName =
      data.name_en_us || data.name_ja_jp || data.name_zh_cn || data.name_zh_tw
    if (!hasAtLeastOneName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '至少需要填写一个语言版本的游戏名称',
        path: ['name_zh_cn']
      })
    }

    const hasAtLeastOneIntro =
      data.intro_en_us ||
      data.intro_ja_jp ||
      data.intro_zh_cn ||
      data.intro_zh_tw
    if (!hasAtLeastOneIntro) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '至少需要填写一个语言版本的游戏介绍',
        path: ['intro_zh_cn']
      })
    }
  })

export const updateGalgameSchema = z
  .object({
    vndbId: z
      .string()
      .min(2)
      .max(10)
      .refine((value) => VNDBPattern.test(value), {
        message: '非法的 VNDB ID 格式'
      }),
    name_en_us: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    name_ja_jp: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    name_zh_cn: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    name_zh_tw: z
      .string()
      .max(100007, { message: '游戏名称最多 233 字' })
      .default(''),
    intro_en_us: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    intro_ja_jp: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    intro_zh_cn: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    intro_zh_tw: z
      .string()
      .max(100007, { message: '游戏介绍最多 100007 字' })
      .default(''),
    contentLimit: z.enum(['sfw', 'nsfw']),
    aliases: z.string().default('')
  })
  .superRefine((data, ctx) => {
    const aliasArray = data.aliases.split(',')
    const isAliasLengthValid = aliasArray.length < 30
    if (!isAliasLengthValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Galgame 最多有 30 个别名',
        path: ['aliases']
      })
    }
    const hasInvalidAlias = aliasArray.some((a) => a.length > 500)
    if (hasInvalidAlias) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '每个 Galgame 别名最多 500 个字符',
        path: ['aliases']
      })
    }

    const hasAtLeastOneName =
      data.name_en_us || data.name_ja_jp || data.name_zh_cn || data.name_zh_tw
    if (!hasAtLeastOneName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '至少需要填写一个语言版本的游戏名称',
        path: ['name_zh_cn']
      })
    }

    const hasAtLeastOneIntro =
      data.intro_en_us ||
      data.intro_ja_jp ||
      data.intro_zh_cn ||
      data.intro_zh_tw
    if (!hasAtLeastOneIntro) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '至少需要填写一个语言版本的游戏介绍',
        path: ['intro_zh_cn']
      })
    }
  })

export const updateGalgameBannerSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  banner: z.unknown()
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
 * Pull requests
 */

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

export const updateGalgamePrMergeSchema = z.object({
  galgamePrId: z.coerce.number().min(1).max(9999999)
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

export const getGalgameSeriesSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999)
})
