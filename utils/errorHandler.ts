import {
  getErrorMessageEN,
  getErrorMessageJP,
  getErrorMessageCN,
  getErrorMessageTW
} from '~/error/errorI18n'

const showMessage = (errorCode: number) => {
  const messageType = 'error'
  const message = {
    'en-us': getErrorMessageEN(errorCode),
    'ja-jp': getErrorMessageJP(errorCode),
    'zh-cn': getErrorMessageCN(errorCode),
    'zh-tw': getErrorMessageTW(errorCode)
  }

  useMessage(message, messageType, 5000)
}

export const kungalgameErrorHandler = (errorNumber: string) => {
  showMessage(parseInt(errorNumber))
}
