import type { updateUpdateLogSchema } from '~/validations/update-log'
import type { z } from 'zod'

type UpdateUpdateLogPayload = z.infer<typeof updateUpdateLogSchema>
