import { Context } from 'koa'
import { errorMessages } from './kunErrorList'

// 默认的未知错误消息
const defaultErrorMessage = 'Unknown server error'

export const kungalgameErrorHandler = (code: number, ctx: Context) => {
  // 根据错误代码查找错误消息，如果找不到则使用默认消息
  const errorMessage = errorMessages[code] || defaultErrorMessage

  // 设置响应状态码，这里将任何可预见的错误都设为了 233
  ctx.status = 233

  // 设置响应主体
  ctx.body = {
    code,
    message: errorMessage,
  }
}
