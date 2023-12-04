import jwt from 'jsonwebtoken'
import env from '@/config/config.dev'

/*
 * iss（Issuer）: 表示令牌的发行者，通常是一个字符串标识符。
 * sub（Subject）: 表示令牌的主题，通常是用户的唯一标识符。
 * aud（Audience）: 表示令牌的受众，通常是应用程序的标识符。
 * exp（Expiration Time）: 表示令牌的过期时间，以秒为单位的时间戳。
 * nbf（Not Before）: 表示令牌在某个时间之前不可用，以秒为单位的时间戳。
 * iat（Issued At）: 表示令牌的签发时间，以秒为单位的时间戳。
 * jti（JWT ID）: 表示令牌的唯一标识符。
 */

interface Payload {
  iss: string
  aud: string
  uid: number
  name: string
}

// 根据前端请求头验证 jwt
export function verifyJWTPayloadByHeader(authHeader: string) {
  // Bearer 标头为 Authorization: Bearer <token>，所以要这样获取 jwt
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as Payload
    return payload
  } catch (error) {
    return null
  }
}

// 验证 jwt
export function verifyJWTPayload(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as Payload
    return payload
  } catch (error) {
    return null
  }
}

// 生成 token 返回给客户端，payload 里存放用户的 uid 和 name
export function generateToken(uid: number, name: string, expire: string) {
  const payload: Payload = { iss: env.JWT_ISS, aud: env.JWT_AUD, uid, name }
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: expire })

  return token
}
