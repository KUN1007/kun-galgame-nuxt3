import { getErrorMessageEN, getErrorMessageCN } from '~/error/errorI18n'

const showMessage = (errorCode: number) => {
  const messageType = 'error'
  const messageTextEN = getErrorMessageEN(errorCode)
  const messageTextCN = getErrorMessageCN(errorCode)
  useMessage(messageTextEN, messageTextCN, messageType, 5000)
}

export const kungalgameErrorHandler = (errorNumber: string) => {
  alert(errorNumber + '----' + typeof errorNumber)
  showMessage(parseInt(errorNumber))
}
