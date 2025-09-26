import { z } from 'zod'

export const getUnmoeLogSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30)
})
