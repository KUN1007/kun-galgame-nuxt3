import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export interface GalgamePR {
  gprid: number
  gid: number
  status: number
  time: Date | string
  completedTime: number

  user: KunUser
}

export interface GalgamePRDetails extends GalgamePR {
  galgame: Partial<GalgameStoreTemp>
}
