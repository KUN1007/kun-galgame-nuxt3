import { z } from 'zod'

export const getGalgameByEngineSchema = z.object({
  engineId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(24)
})

export const updateGalgameEngineSchema = z.object({
  engineId: z.coerce.number().min(1).max(9999999),
  name: z.string().min(1).max(100, '引擎名最多 100 个字符'),
  description: z
    .string()
    .max(1000, '引擎介绍最多 1000 个字符')
    .optional()
    .default(''),
  alias: z
    .array(z.string().min(1).max(100, '单个引擎别名最多 100 个字符'))
    .max(20, '引擎别名最多 20 个')
    .optional()
    .default([])
})
