import type { H3Event } from 'h3'

export const kunError = (
  event: H3Event,
  message?: string,
  code?: number,
  errorCode?: number
) => {
  event.node.res.statusCode = errorCode || 400
  event.node.res.setHeader('Kun-Error', code?.toString() || '')
  event.node.res.setHeader('Kun-Error-Message', message || '')
}
