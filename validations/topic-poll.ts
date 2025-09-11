import { z } from 'zod'

const pollOptionSchema = z.object({
  text: z.string().min(1, '选项内容不能为空').max(100, '选项内容最多100个字符')
})

export const createPollSchema = z.object({
  topic_id: z.coerce.number().min(1).max(9999999),
  title: z
    .string()
    .min(1, '投票标题不能为空')
    .max(100, '投票标题最多100个字符'),
  description: z
    .string()
    .max(500, '投票描述最多500个字符')
    .optional()
    .default(''),
  type: z.enum(['single', 'multiple'], { message: '投票类型必须是单选或多选' }),
  min_choice: z.coerce.number().int().min(1).optional(),
  max_choice: z.coerce.number().int().min(1).optional(),
  deadline: z.string().datetime({ message: '截止日期格式不正确' }).optional(),
  result_visibility: z.enum(['always', 'after_vote', 'after_deadline'], {
    message: '结果可见性设置不正确'
  }),
  is_anonymous: z.boolean(),
  can_change_vote: z.boolean(),
  options: z
    .array(pollOptionSchema)
    .min(2, '投票至少需要2个选项')
    .max(20, '投票最多只能有20个选项')
})

export const getPollByTopicSchema = z.object({
  topic_id: z.coerce.number().min(1).max(9999999)
})

export const updateUserVoteSchema = z.object({
  poll_id: z.coerce.number().min(1).max(9999999),
  option_id_array: z.array(z.coerce.number().int()).min(1, '请至少选择一个选项')
})

export const updatePollSchema = z.object({
  poll_id: z.coerce.number().min(1).max(9999999),
  title: z
    .string()
    .min(1, '投票标题不能为空')
    .max(100, '投票标题最多100个字符'),
  description: z
    .string()
    .max(500, '投票描述最多500个字符')
    .optional()
    .default(''),
  type: z.enum(['single', 'multiple'], { message: '投票类型必须是单选或多选' }),
  min_choice: z.coerce.number().int().min(1).optional(),
  max_choice: z.coerce.number().int().min(1).optional(),
  deadline: z.string().datetime({ message: '截止日期格式不正确' }).optional(),
  result_visibility: z.enum(['always', 'after_vote', 'after_deadline'], {
    message: '结果可见性设置不正确'
  }),
  is_anonymous: z.boolean(),
  can_change_vote: z.boolean(),

  options: z
    .object({
      add: z.array(pollOptionSchema).optional(),
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
        .optional(),
      delete: z.array(z.coerce.number().min(1).max(9999999)).optional()
    })
    .optional()
})

export const deletePoolSchema = z.object({
  poll_id: z.coerce.number().min(1).max(9999999)
})
