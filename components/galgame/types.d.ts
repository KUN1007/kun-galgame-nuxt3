import type { z } from 'zod'
import type { updateGalgameTagSchema } from '~/validations/galgame-tag'
import type { updateGalgameOfficialSchema } from '~/validations/galgame-official'
import type { updateGalgameEngineSchema } from '~/validations/galgame-engine'

export type UpdateGalgameTagPayload = z.infer<typeof updateGalgameTagSchema>
export type UpdateGalgameOfficialPayload = z.infer<
  typeof updateGalgameOfficialSchema
>
export type UpdateGalgameEnginePayload = z.infer<
  typeof updateGalgameEngineSchema
>
