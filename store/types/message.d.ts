export interface MessageStore {
  showInfo: boolean
  infoTranslateParams: string
  durations: number

  showAlert: boolean
  infoMsg: string
  alertMsg: string
  isShowCancel: boolean
  confirm: boolean

  isShowCapture: boolean
  isCaptureSuccessful: boolean
}
