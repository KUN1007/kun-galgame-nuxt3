export interface MessageStore {
  showInfo: boolean
  showAlert: boolean
  infoMsg: string
  alertMsg: string
  isShowCancel: boolean
  confirm: boolean

  isShowCapture: boolean
  isCaptureSuccessful: boolean
}
