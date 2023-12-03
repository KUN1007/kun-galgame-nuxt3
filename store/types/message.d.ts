export interface MessageStore {
  // Whether to display informational messages
  showInfo: boolean
  // Whether to display warning messages
  showAlert: boolean
  // Content of informational messages
  infoMsg: string
  // Content of warning messages
  alertMsg: string
  // Whether to display a cancel button (used by Alert component)
  isShowCancel: boolean
  // Response confirmation (used by Alert component)
  confirm: boolean

  // CAPTCHA component
  // Whether to display CAPTCHA
  isShowCapture: boolean
  // Whether CAPTCHA verification is successful
  isCaptureSuccessful: boolean
}
