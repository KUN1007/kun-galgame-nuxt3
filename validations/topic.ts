import { z } from 'zod'
import {
  KUN_TOPIC_CATEGORY_CONST,
  KUN_TOPIC_SECTION_CONST,
  TOPIC_SORT_FIELD_CONST
} from '~/constants/topic'

const SORT_ORDER_CONST = ['asc', 'desc'] as const

/*
 * Topic
 */

export const getTopicSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  sortField: z.enum(TOPIC_SORT_FIELD_CONST),
  sortOrder: z.enum(SORT_ORDER_CONST),
  category: z.enum(KUN_TOPIC_CATEGORY_CONST)
})

export const getTopicDetailSchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999)
})

export const createTopicSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(107, { message: '话题标题最大长度为 107 个字符' })
    .refine((t) => t.trim().length > 1, { message: '话题标题最少为 1 个字符' }),
  content: z
    .string()
    .min(1)
    .max(100007, { message: '话题标题最大长度为 100007 个字符' })
    .refine((t) => t.trim().length > 1, { message: '话题内容最少为 1 个字符' }),
  tags: z
    .array(
      z
        .string()
        .min(1)
        .max(17, { message: '每个标签最多 17 个字符' })
        .refine((t) => t.trim().length > 1, {
          message: '每个标签最少为 1 个字符'
        })
    )
    .min(1, { message: '每个话题至少有一个标签' })
    .max(7, { message: '每个话题最多有 7 个标签' }),
  category: z.enum(KUN_TOPIC_CATEGORY_CONST),
  section: z
    .array(z.enum(KUN_TOPIC_SECTION_CONST))
    .min(1, { message: '您至少选择一个话题的分区' })
    .min(3, { message: '您至多选择三个话题的分区' })
})

export const updateTopicSchema = createTopicSchema.merge(
  z.object({
    topicId: z.coerce.number().min(1).max(9999999)
  })
)

export const updateTopicLikeSchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999)
})

export const updateTopicDislikeSchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999)
})

export const updateTopicUpvoteSchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999)
})

export const updateTopicFavoriteSchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999)
})

/*
 * Reply
 */

export const getReplySchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  sortOrder: z.enum(SORT_ORDER_CONST)
})

export const createReplySchema = z
  .object({
    topicId: z.coerce.number().min(1).max(9999999),
    content: z
      .string()
      .min(1, { message: '回复内容最少 1 个字符' })
      .max(10007, { message: '单条回复的最大长度为 10007 个字符' })
      .optional(),
    targets: z
      .array(
        z.object({
          targetReplyId: z.coerce.number().min(1).max(9999999),
          content: z
            .string()
            .min(1, { message: '回复内容最少 1 个字符' })
            .max(10007, { message: '单条回复的最大长度为 10007 个字符' })
        })
      )
      .min(1, { message: '至少需要指定一个回复目标' })
      .max(10, { message: '最多只能同时回复 10 个目标' })
  })
  .refine((data) => data.content?.trim() || data.targets, {
    message: '至少需要提供回复内容或回复目标才可以进行更新'
  })

export const updateReplySchema = z
  .object({
    replyId: z.coerce.number().min(1).max(9999999),
    content: z
      .string()
      .min(1, { message: '回复内容最少 1 个字符' })
      .max(10007, { message: '单条回复的最大长度为 10007 个字符' })
      .optional(),
    targets: z
      .array(
        z.object({
          targetReplyId: z.coerce.number().min(1).max(9999999),
          content: z
            .string()
            .min(1, { message: '回复内容最少 1 个字符' })
            .max(10007, { message: '单条回复的最大长度为 10007 个字符' })
        })
      )
      .optional()
  })
  .refine((data) => data.content?.trim() || data.targets, {
    message: '至少需要提供回复内容或回复目标才可以进行更新'
  })

export const updateReplyLikeSchema = z.object({
  replyId: z.coerce.number().min(1).max(9999999)
})

export const updateReplyDislikeSchema = z.object({
  replyId: z.coerce.number().min(1).max(9999999)
})

/*
 * Comment
 */

export const createCommentSchema = z.object({
  topicId: z.coerce.number().min(1).max(9999999),
  replyId: z.coerce.number().min(1).max(9999999),
  targetUserId: z.coerce.number().min(1).max(9999999),
  content: z
    .string()
    .min(1, { message: '评论最少 1 个字符' })
    .max(1007, { message: '评论的最大长度为 1007 个字符' })
})

export const updateCommentLikeSchema = z.object({
  commentId: z.coerce.number().min(1).max(9999999)
})
