import { verifyJWTPayload } from './jwt'
import type { H3Event } from 'h3'

export function getCookieTokenInfo(event: H3Event) {
  const refreshToken = getCookie(event, 'kungalgame-moemoe-refresh-token')

  if (!refreshToken) {
    return null
  }

  try {
    const user = verifyJWTPayload(refreshToken)
    return user
  } catch (error) {
    return null
  }
}
