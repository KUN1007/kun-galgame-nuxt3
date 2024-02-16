export interface MessageStore {
  showInfo: boolean
  infoMsg: string
  infoTranslateParams: string
  durations: number

  showAlert: boolean
  alertMsg: string
  isShowCancel: boolean
  confirm: boolean

  isShowCapture: boolean
  isCaptureSuccessful: boolean
}
