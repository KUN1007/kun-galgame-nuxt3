import { getErrorMessageEN, getErrorMessageCN } from './errorI18n'

const showMessage = (errorCode: number) => {
  const messageType = 'error'
  const messageTextEN = getErrorMessageEN(errorCode)
  const messageTextCN = getErrorMessageCN(errorCode)
  Message(messageTextEN, messageTextCN, messageType)
}

export const kungalgameErrorHandler = (errorNumber: number) => {
  showMessage(errorNumber)
}
