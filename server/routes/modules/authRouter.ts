import Router from 'koa-router'
import AuthController from '@/controller/authController'

const router = new Router()

router.prefix('/api/auth')

// 发送验证码
router.post('/email/code', AuthController.sendVerificationCodeEmail)

// 根据 refresh token 获取 token
router.post('/token/refresh', AuthController.generateTokenByRefreshToken)

// 重置邮箱验证码
router.post('/email/reset', AuthController.sendResetEmailCode)

// 重置密码
router.post('/password/reset', AuthController.resetPasswordByEmail)

export default router
