import { z } from 'zod'

const pollOptionSchema = z.object({
  text: z.string().min(1, '选项内容不能为空').max(100, '选项内容最多100个字符')
})

const poolSchema = z.object({
  title: z
    .string()
    .min(1, '投票标题不能为空')
    .max(100, '投票标题最多100个字符'),
  description: z.string().max(500, '投票描述最多500个字符').default(''),
  type: z.enum(['single', 'multiple'], { message: '投票类型必须是单选或多选' }),
  min_choice: z.coerce.number().int().min(1).default(1),
  max_choice: z.coerce.number().int().min(1).default(1),
  deadline: z.string().datetime().optional(),
  result_visibility: z.enum(['always', 'after_vote', 'after_deadline'], {
    message: '结果可见性设置不正确'
  }),
  is_anonymous: z.boolean(),
  can_change_vote: z.boolean()
})

export const createPollSchema = poolSchema.merge(
  z.object({
    topic_id: z.coerce.number().min(1).max(9999999),
    options: z
      .array(pollOptionSchema)
      .min(2, '投票至少需要2个选项')
      .max(20, '投票最多只能有20个选项')
  })
)
export const getPollByTopicSchema = z.object({
  topic_id: z.coerce.number().min(1).max(9999999)
})

export const updateUserVoteSchema = z.object({
  poll_id: z.coerce.number().min(1).max(9999999),
  option_id_array: z.array(z.coerce.number().int()).min(1, '请至少选择一个选项')
})

export const updatePollSchema = poolSchema.merge(
  z.object({
    poll_id: z.coerce.number().min(1).max(9999999),
    options: z.object({
      add: z.array(pollOptionSchema).optional().default([]),
      update: z
        .array(
          z.object({
            option_id: z.coerce.number().min(1).max(9999999),
            text: z
              .string()
              .min(1, '选项内容不能为空')
              .max(100, '选项内容最多100个字符')
          })
        )
        .optional()
        .default([]),
      delete: z
        .array(z.coerce.number().min(1).max(9999999))
        .optional()
        .default([])
    })
  })
)

export const deletePollSchema = z.object({
  poll_id: z.coerce.number().min(1).max(9999999)
})

export const getPollLogSchema = z.object({
  poll_id: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50)
})
