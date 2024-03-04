import { useTempMessageStore } from '~/store/temp/message'
import { isValidEmail, isValidName, isValidPassword } from '~/utils/validate'
import type { Pinia } from '@pinia/nuxt/dist/runtime/composables'

export const checkRegisterForm = {
  asyncData ($pinia: Pinia) {
    const info = useTempMessageStore($pinia)

    const checkForm = (
      name: string,
      email: string,
      password: string
    ): boolean => {
      if (!name.trim() || !email.trim() || !password.trim()) {
        useMessage(
          'Username, email, password field cannot be empty!',
          '用户名，邮箱，密码字段不可为空！',
          'warn'
        )
        return false
      }

      if (!isValidName(name)) {
        info.info('AlertInfo.login.invalidUsername')
        return false
      }

      if (!isValidEmail(email)) {
        useMessage('Invalid email format!', '非法的邮箱格式！', 'warn')
        return false
      }

      if (!isValidPassword(password)) {
        info.info('AlertInfo.login.invalidPassword')
        return false
      }

      return true
    }

    const checkRegister = (isSendCode: boolean, code: string) => {
      if (!isSendCode) {
        useMessage(
          'Need to send an email verification code',
          '需要发送邮箱验证码',
          'warn'
        )
        return false
      }

      if (!code.trim()) {
        useMessage(
          'Email verification code cannot be empty',
          '邮箱验证码不可为空',
          'warn'
        )
        return false
      }

      if (!isValidMailConfirmCode(code)) {
        info.info('AlertInfo.login.invalidCode')
        return false
      }

      return true
    }

    return { checkForm, checkRegister }
  }
}
