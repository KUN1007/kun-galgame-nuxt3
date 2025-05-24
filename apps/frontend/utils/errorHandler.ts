import { errorMessages } from '~/error/errorI18n'

export const kungalgameErrorHandler = (errorNumber: string) => {
  const messageType = 'error'
  const message = errorMessages[Number(errorNumber)] || `未知的服务器错误 (-B)`
  useMessage(message, messageType, 5000)
}
