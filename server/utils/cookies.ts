import { Context } from 'koa'
// 导入获取 jwt payload 的函数
import { verifyJWTPayload } from './jwt'

// 将 refresh token 设置到 http only cookie
export function setCookieRefreshToken(ctx: Context, token: string) {
  // 设置刷新 token，有效期 7 天
  ctx.cookies.set('kungalgame-moemoe-refresh-token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

// 从 cookie 中的 refresh token 获取用户信息
export function getCookieTokenInfo(ctx: Context) {
  // 从 cookie 中获取 refresh token
  const refreshToken = ctx.cookies.get('kungalgame-moemoe-refresh-token')

  try {
    // 从 refresh token 获取用户的信息
    const user = verifyJWTPayload(refreshToken)
    return user
  } catch (error) {
    console.log('Get user info from cookies error', error)
  }
}
