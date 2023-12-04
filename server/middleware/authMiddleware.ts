import { Context, Middleware } from 'koa'
import { verifyJWTPayloadByHeader } from '@/utils/jwt'
// import { KUNError } from '@/error/kunError'
// import { kunErrorHandler } from '@/error/errorHandler'

const whitelistRegex =
  /^\/api\/(auth|public|user\/login|user\/register|balance|non-moe)|uploads\/avatar|uploads\/login/

export function kungalgameAuthMiddleware(): Middleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const path = ctx.request.path

    const isWhitelisted = whitelistRegex.test(path)

    if (isWhitelisted) {
      await next()
      return
    }

    const authorizationHeader = ctx.headers.authorization

    if (!authorizationHeader) {
      ctx.status = 401
      ctx.body = 'Unauthorized'
      return
    }

    // 解码 JWT 令牌
    const decoded = verifyJWTPayloadByHeader(authorizationHeader)

    // 解码失败
    if (!decoded) {
      // 这里直接返回 205，配合前端可以实现无感刷新 token
      ctx.status = 205
      return
    }

    // 没有 UID，不是由 kungalgame 签发的萌萌 token
    if (
      !decoded.uid ||
      decoded.iss !== 'kungalgame' ||
      decoded.aud !== 'kungalgamer'
    ) {
      ctx.status = 401
      ctx.body = 'Non moemoe!'
      return
    }

    // 将 UID 存储在 ctx.state 中以供后续中间件或路由使用
    ctx.state.uid = decoded.uid

    // 继续执行下一个中间件或路由处理程序
    await next()
  }
}
