import type { z } from 'zod'
import type { updateGalgameTagSchema } from '~/validations/galgame-tag'
import type { updateGalgameOfficialSchema } from '~/validations/galgame-official'
import type { updateGalgameEngineSchema } from '~/validations/galgame-engine'
import type {
  createGalgameSeriesSchema,
  updateGalgameSeriesSchema
} from '~/validations/galgame-series'

export type UpdateGalgameTagPayload = z.infer<typeof updateGalgameTagSchema>
export type UpdateGalgameOfficialPayload = z.infer<
  typeof updateGalgameOfficialSchema
>
export type UpdateGalgameEnginePayload = z.infer<
  typeof updateGalgameEngineSchema
>

export type CreateGalgameSeriesPayload = z.infer<
  typeof createGalgameSeriesSchema
>
export type UpdateGalgameSeriesPayload = z.infer<
  typeof updateGalgameSeriesSchema
>
