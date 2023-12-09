import { getErrorMessageEN, getErrorMessageCN } from '~/error/errorI18n'

const showMessage = (errorCode: number) => {
  const messageType = 'error'
  const messageTextEN = getErrorMessageEN(errorCode)
  const messageTextCN = getErrorMessageCN(errorCode)
  useMessage(messageTextEN, messageTextCN, messageType)
}

export const kungalgameErrorHandler = (errorNumber: string) => {
  showMessage(parseInt(errorNumber))
}
