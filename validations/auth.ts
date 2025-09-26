import { z } from 'zod'
import { isValidName, isValidPassword } from '~/utils/validate'

export const createSendForgotPasswordVerificationCodeSchema = z.object({
  email: z.string().email({ message: '非法的邮箱格式' })
})

export const createSendRegisterVerificationCodeSchema = z.object({
  name: z.string().refine((s) => isValidName(s), {
    message: '非法的用户名'
  }),
  email: z.string().email({ message: '非法的邮箱格式' })
})

export const createSendResetEmailVerificationCodeSchema = z.object({
  email: z.string().email({ message: '非法的邮箱格式' })
})

export const createSendResetPasswordByEmailVerificationCodeSchema = z.object({
  codeSalt: z.string().min(64).max(64),
  email: z.string().email({ message: '非法的邮箱格式' }),
  code: z.string().min(7).max(7),
  newPassword: z.string().refine((s) => isValidPassword(s), {
    message:
      '新密码格式错误，密码的长度为 6 到 107 位，必须包含至少一个英文字符和一个数字，可以选择性的包含 @!#$%^&*()_-+=\\/ 等特殊字符'
  })
})
