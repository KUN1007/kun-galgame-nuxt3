import type { z } from 'zod'
import type { updateGalgameTagSchema } from '~/validations/galgame-tag'

export type UpdateGalgameTagPayload = z.infer<typeof updateGalgameTagSchema>
