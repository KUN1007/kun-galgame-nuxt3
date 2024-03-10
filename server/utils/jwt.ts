import jwt from 'jsonwebtoken'
import type { KUNGalgamePayload } from '~/types/utils/jwt'

const config = useRuntimeConfig()

export const generateToken = (uid: number, name: string, expire: string) => {
  const payload: KUNGalgamePayload = {
    iss: config.JWT_ISS,
    aud: config.JWT_AUD,
    uid,
    name
  }

  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: expire
  })

  return token
}

export const createTokens = async (uid: number, name: string) => {
  const token = generateToken(uid, name, '60m')
  const refreshToken = generateToken(uid, name, '30d')

  // see: https://unstorage.unjs.io/drivers/redis
  await useStorage('redis').setItem(`refreshToken:${uid}`, refreshToken, {
    ttl: 30 * 24 * 60 * 60
  })

  return { token, refreshToken }
}
