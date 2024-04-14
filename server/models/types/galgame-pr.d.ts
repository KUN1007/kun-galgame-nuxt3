import type { GalgameStoreTemp } from '~/store/types/edit/galgame'
import type { UserAttributes } from './user'

interface _Difference {
  oldValue: unknown
  newValue: unknown
}

export interface GalgamePR {
  gprid: number
  gid: number
  uid: number
  status: number
  galgame: GalgameStoreTemp

  user: UserAttributes[]

  created: Date
  updated: Date
}
