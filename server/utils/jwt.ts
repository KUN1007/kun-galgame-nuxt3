import jwt from 'jsonwebtoken'
import { KUNGalgamePayload } from '~/types/utils/jwt'

const config = useRuntimeConfig()

export const verifyJWTPayloadByHeader = (authHeader: string) => {
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as KUNGalgamePayload
    return payload
  } catch (error) {
    return null
  }
}

export const verifyJWTPayload = (token: string) => {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as KUNGalgamePayload
    return payload
  } catch (error) {
    return null
  }
}

export const generateToken = (uid: number, name: string, expire: string) => {
  const payload: KUNGalgamePayload = {
    iss: config.JWT_ISS,
    aud: config.JWT_AUD,
    uid,
    name,
  }
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: expire,
  })

  return token
}
