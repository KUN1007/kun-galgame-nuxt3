import type { Galgame } from './galgame'
import type { UserAttributes } from './user'

export interface GalgamePR {
  gprid: number
  gid: number
  uid: number
  status: number
  galgame: Partial<Galgame>

  user: UserAttributes[]

  created: Date
  updated: Date
}
