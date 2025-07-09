import { createError, sendError } from 'h3'
import type { H3Event } from 'h3'

export const kunError = (
  event: H3Event,
  message: string,
  code: number = 233,
  statusCode: number = 233
) => {
  return sendError(
    event,
    createError({
      statusCode: statusCode,
      data: { code, message }
    })
  )
}
