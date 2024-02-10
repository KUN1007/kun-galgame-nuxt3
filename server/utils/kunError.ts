import type { H3Event } from 'h3'

export const kunError = (event: H3Event, code: number, errorCode?: number) => {
  setResponseStatus(event, errorCode ? errorCode : 233, code.toString())
}
