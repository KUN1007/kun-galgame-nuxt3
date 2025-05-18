export interface MessageStore {
  showAlert: boolean
  alertTitle?: string
  alertMsg?: string
  isShowCancel?: boolean

  isShowCapture: boolean
  isCaptureSuccessful: boolean

  codeSalt: string
}
