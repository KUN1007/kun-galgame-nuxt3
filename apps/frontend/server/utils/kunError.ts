import type { H3Event } from 'h3'

export const kunError = (event: H3Event, code: number, errorCode?: number) => {
  event.node.res.statusCode = errorCode || 233
  event.node.res.setHeader('Kun-Error', code.toString())
}
