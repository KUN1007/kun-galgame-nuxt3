export interface MessageStore {
  showInfo: boolean
  infoMsg: string
  infoTranslateParams: string
  durations: number

  showAlert: boolean
  alertTitle?: string
  alertMsg?: string
  isShowCancel?: boolean

  isShowCapture: boolean
  isCaptureSuccessful: boolean
}
