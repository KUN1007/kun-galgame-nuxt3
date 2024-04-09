import type { KunLanguage } from '~/types/i18n'

export interface MessageStore {
  showInfo: boolean
  infoMsg: string
  infoTranslateParams: string
  durations: number

  showAlert: boolean
  alertTitle?: KunLanguage
  alertMsg?: KunLanguage
  isShowCancel?: boolean

  isShowCapture: boolean
  isCaptureSuccessful: boolean
}
