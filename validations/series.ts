import { z } from 'zod'

export const getSeriesDetailSchema = z.object({
  seriesId: z.coerce.number().min(1).max(9999999)
})
