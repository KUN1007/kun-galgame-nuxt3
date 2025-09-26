import type { z } from 'zod'
import type { updateUpdateLogSchema } from '~/validations/update-log'
import type { updateTodoSchema } from '~/validations/todo'

type UpdateUpdateLogPayload = z.infer<typeof updateUpdateLogSchema>
type UpdateTodoPayload = z.infer<typeof updateTodoSchema>
