import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export interface GalgamePR {
  id: number
  galgameId: number
  index: number
  status: number
  user: KunUser
  completedTime: Date | string | null
}

export interface GalgamePRDetails extends GalgamePR {
  galgame: Partial<GalgameStoreTemp>
}
