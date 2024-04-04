import { KunLanguageBack } from '~/types/i18n'

export interface Balance {
  bid: number
  reason: KunLanguageBack
  type: string
  time: number
  amount: number
  status: number

  created: Date
  updated: Date
}
