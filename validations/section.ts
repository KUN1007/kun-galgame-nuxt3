import { z } from 'zod'

export const getSectionSchema = z.object({
  section: z.string().min(1).max(50),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  sortOrder: z.enum(['asc', 'desc'])
})
