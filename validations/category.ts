import { z } from 'zod'
import { KUN_ALLOWED_CATEGORY } from '~/constants/category'

export const getTopicCategoryStats = z.object({
  category: z.enum(KUN_ALLOWED_CATEGORY, { message: '请选择我们支持的分类' })
})
