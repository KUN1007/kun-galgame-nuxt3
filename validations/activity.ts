import { z } from 'zod'
import { KUN_ALLOWED_ACTIVITY_TYPE } from '~/constants/activity'

export const getActivitySchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(30),
  type: z.enum(KUN_ALLOWED_ACTIVITY_TYPE)
})
