import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'
import type { KUNGalgamePayload } from '~/types/utils/jwt'

const config = useRuntimeConfig()

export const getCookieTokenInfo = async (event: H3Event) => {
  const refreshToken = getCookie(event, 'kungalgame-moemoe-refresh-token')

  if (!refreshToken) {
    return null
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      config.JWT_SECRET
    ) as KUNGalgamePayload
    const redisToken = await useStorage('redis').getItem(
      `refreshToken:${payload.uid}`
    )

    if (!redisToken) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}
