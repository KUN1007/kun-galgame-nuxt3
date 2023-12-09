import type { H3Event } from 'h3'

export const kunError = (event: H3Event, code: number) => {
  event.node.res.statusCode = 233
  event.node.res.statusMessage = code.toString()
}
