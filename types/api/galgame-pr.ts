import type { updateGalgameSchema } from '~/validations/galgame'
import type { z } from 'zod'

export interface GalgamePR {
  id: number
  galgameId: number
  index: number
  status: number
  user: KunUser
  completedTime: Date | string | null
  created: Date | string
}

export interface GalgamePRDetails extends GalgamePR {
  oldData: z.infer<typeof updateGalgameSchema>
  newData: z.infer<typeof updateGalgameSchema>
}
