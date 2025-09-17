import { z } from 'zod'
import { KUN_ALLOWED_ACTIVITY_TYPE } from '~/constants/activity'

export const getActivitySchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(KUN_ALLOWED_ACTIVITY_TYPE)
})

export const getActivityTimelineSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50)
})
