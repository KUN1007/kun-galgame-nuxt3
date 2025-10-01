import { z } from 'zod'
import {
  KUN_GALGAME_RATING_RECOMMEND_CONST,
  KUN_GALGAME_RATING_SPOILER_CONST,
  KUN_GALGAME_RATING_PLAY_STATUS_CONST,
  KUN_GALGAME_RATING_GAME_TYPE_CONST,
  KUN_GALGAME_RATING_SORT_FIELD_CONST
} from '~/constants/galgame-rating'

const SORT_ORDER_CONST = ['asc', 'desc'] as const

export const createGalgameRatingSchema = z
  .object({
    galgameId: z.coerce.number().min(1).max(9999999),
    recommend: z.enum(KUN_GALGAME_RATING_RECOMMEND_CONST),
    overall: z.coerce.number().int().min(1).max(10),
    galgameType: z
      .array(z.enum(KUN_GALGAME_RATING_GAME_TYPE_CONST))
      .min(1, { message: '您至少选择一个 Galgame 类型' }),
    play_status: z.enum(KUN_GALGAME_RATING_PLAY_STATUS_CONST),
    short_summary: z.string().default(''),
    spoiler_level: z.enum(KUN_GALGAME_RATING_SPOILER_CONST).default('none'),

    art: z.coerce.number().int().min(0).max(10).default(0),
    story: z.coerce.number().int().min(0).max(10).default(0),
    music: z.coerce.number().int().min(0).max(10).default(0),
    character: z.coerce.number().int().min(0).max(10).default(0),
    route: z.coerce.number().int().min(0).max(10).default(0),
    system: z.coerce.number().int().min(0).max(10).default(0),
    voice: z.coerce.number().int().min(0).max(10).default(0),
    replay_value: z.coerce.number().int().min(0).max(10).default(0)
  })
  .superRefine((data, ctx) => {
    if (
      (data.overall === 1 || data.overall === 10) &&
      (data.short_summary ?? '').trim().length < 100
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '当 overall 为 1 或 10 时, short_summary 需不少于 100 字',
        path: ['short_summary']
      })
    }
  })

export const updateGalgameRatingSchema = z
  .object({
    galgameRatingId: z.coerce.number().min(1).max(9999999),
    recommend: z.enum(KUN_GALGAME_RATING_RECOMMEND_CONST),
    overall: z.coerce.number().int().min(1).max(10),
    galgameType: z
      .array(z.enum(KUN_GALGAME_RATING_GAME_TYPE_CONST))
      .min(1, { message: '您至少选择一个 Galgame 类型' }),
    play_status: z.enum(KUN_GALGAME_RATING_PLAY_STATUS_CONST),
    short_summary: z.string(),
    spoiler_level: z.enum(KUN_GALGAME_RATING_SPOILER_CONST),

    art: z.coerce.number().int().min(0).max(10),
    story: z.coerce.number().int().min(0).max(10),
    music: z.coerce.number().int().min(0).max(10),
    character: z.coerce.number().int().min(0).max(10),
    route: z.coerce.number().int().min(0).max(10),
    system: z.coerce.number().int().min(0).max(10),
    voice: z.coerce.number().int().min(0).max(10),
    replay_value: z.coerce.number().int().min(0).max(10)
  })
  .superRefine((data, ctx) => {
    if (data.overall !== undefined) {
      const needSummary = data.overall === 1 || data.overall === 10
      if (
        needSummary &&
        (!data.short_summary || data.short_summary.trim().length < 100)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '当 overall 为 1 或 10 时, short_summary 需不少于 100 字',
          path: ['short_summary']
        })
      }
    }
  })

export const deleteGalgameRatingSchema = z.object({
  galgameRatingId: z.coerce.number().min(1).max(9999999)
})

export const getGalgameRatingsSchema = z.object({
  galgameId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  sortField: z.enum(KUN_GALGAME_RATING_SORT_FIELD_CONST),
  sortOrder: z.enum(SORT_ORDER_CONST),
  spoilerLevel: z.enum([...KUN_GALGAME_RATING_SPOILER_CONST, 'all']),
  playStatus: z.enum([...KUN_GALGAME_RATING_PLAY_STATUS_CONST, 'all']),
  galgameType: z.enum([...KUN_GALGAME_RATING_GAME_TYPE_CONST, 'all'])
})

export const getGalgameRatingDetailSchema = z.object({
  galgameRatingId: z.coerce.number().min(1).max(9999999)
})

export const getAllGalgameRatingsSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  sortField: z.enum(KUN_GALGAME_RATING_SORT_FIELD_CONST),
  sortOrder: z.enum(SORT_ORDER_CONST),
  spoilerLevel: z.enum([...KUN_GALGAME_RATING_SPOILER_CONST, 'all']),
  playStatus: z.enum([...KUN_GALGAME_RATING_PLAY_STATUS_CONST, 'all']),
  galgameType: z.enum([...KUN_GALGAME_RATING_GAME_TYPE_CONST, 'all'])
})

export const updateGalgameRatingLikeSchema = z.object({
  galgameRatingId: z.coerce.number().min(1).max(9999999)
})

export const createGalgameRatingCommentSchema = z.object({
  galgameRatingId: z.coerce.number().min(1).max(9999999),
  targetUserId: z.coerce.number().min(1).max(9999999),
  content: z
    .string()
    .min(1)
    .max(1007, { message: '评分评论长度不能超过 1314 字符' })
})

export const deleteGalgameRatingCommentSchema = z.object({
  galgameRatingCommentId: z.coerce.number().min(1).max(9999999)
})

export const updateGalgameRatingCommentSchema = z.object({
  galgameRatingCommentId: z.coerce.number().min(1).max(9999999),
  content: z.string().min(1).max(1314, { message: '内容长度不能超过 1314 字' })
})
