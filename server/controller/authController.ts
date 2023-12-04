import { Context } from 'koa'
import AuthService from '@/service/authService'

import {
  isValidEmail,
  isValidPassword,
  isValidMailConfirmCode,
} from '@/utils/validate'

class AuthController {
  // 发送验证码
  async sendVerificationCodeEmail(ctx: Context) {
    const email: string = ctx.request.body.email

    if (!email) {
      ctx.body = { code: 400, message: 'Email is required' }
      return
    }

    if (!isValidEmail(email)) {
      ctx.app.emit('kunError', 10302, ctx)
      return
    }

    try {
      const result = await AuthService.sendVerificationCodeEmail(email)

      // 返回错误码
      if (typeof result === 'number') {
        ctx.app.emit('kunError', result, ctx)
        return
      }

      ctx.body = { code: 200, message: 'Verification code sent successfully' }
    } catch (error) {
      ctx.body = { code: 500, message: 'Failed to send verification code' }
    }
  }

  // 根据 refresh token 获取 access token
  async generateTokenByRefreshToken(ctx: Context) {
    const refreshToken = ctx.cookies.get('kungalgame-moemoe-refresh-token')

    const newToken = await AuthService.generateTokenByRefreshToken(refreshToken)

    if (newToken) {
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: 'Token refresh successfully',
        data: {
          token: newToken,
        },
      }
    } else {
      ctx.status = 401
      ctx.body = 'Unauthorized'
    }
  }

  // 发送重置邮箱验证码
  async sendResetEmailCode(ctx: Context) {
    const email: string = ctx.request.body.email

    if (!isValidEmail(email)) {
      ctx.app.emit('kunError', 10302, ctx)
      return
    }

    const result = await AuthService.sendResetEmailCode(email)

    // 返回错误码
    if (typeof result === 'number') {
      ctx.app.emit('kunError', result, ctx)
      return
    }

    ctx.body = {
      code: 200,
      message: 'Verification code sent successfully',
      data: {},
    }
  }

  // 重置密码,这里的重置密码需要验证邮箱
  async resetPasswordByEmail(ctx: Context) {
    const { email, code, newPassword } = ctx.request.body

    if (
      !isValidEmail(email) ||
      !isValidMailConfirmCode(code) ||
      !isValidPassword(newPassword)
    ) {
      ctx.app.emit('kunError', 10303, ctx)
      return
    }

    const result = await AuthService.resetPasswordByEmail(
      email,
      code,
      newPassword
    )

    // 返回错误码
    if (typeof result === 'number') {
      ctx.app.emit('kunError', result, ctx)
      return
    }

    ctx.body = {
      code: 200,
      message: 'Reset password successfully!',
      data: {},
    }
  }
}

export default new AuthController()
