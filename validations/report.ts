import { z } from 'zod'
import { reportSection } from '~/constants/report'

export const createReportSchema = z.object({
  reason: z
    .string()
    .min(10, { message: '举报内容不得少于 10 个字符' })
    .max(1007, { message: '举报内容不得多于 1007 个字符' }),
  type: z.enum(reportSection)
})
