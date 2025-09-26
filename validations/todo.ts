import { z } from 'zod'

export const getTodoSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30)
})

export const createTodoSchema = z.object({
  status: z.coerce.number().min(0).max(10, '待办状态应该为数字'),
  content_en_us: z
    .string()
    .max(1000, '更新简体英语待办最多 1000 个字符')
    .optional()
    .default(''),
  content_zh_cn: z
    .string()
    .max(1000, '更新简体中文待办最多 1000 个字符')
    .optional()
    .default('')
})

export const updateTodoSchema = createTodoSchema.merge(
  z.object({
    todoId: z.coerce.number().min(1).max(9999999)
  })
)
