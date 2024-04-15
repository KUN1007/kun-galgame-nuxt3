import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export interface GalgamePR {
  gprid: number
  gid: number
  status: number
  time: Date
  completedTime: number

  user: KunUser
}

export interface GalgamePRDetails extends GalgamePR {
  galgame: GalgameStoreTemp
}
