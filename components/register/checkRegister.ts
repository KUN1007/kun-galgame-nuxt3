import { useComponentMessageStore } from '~/store/temp/components/message'
import type { Pinia } from 'pinia'

export const checkRegisterForm = {
  asyncData($pinia: Pinia) {
    const info = useComponentMessageStore($pinia)

    const checkForm = (
      name: string,
      email: string,
      password: string
    ): boolean => {
      if (!name.trim() || !email.trim() || !password.trim()) {
        useMessage(10138, 'warn')
        return false
      }

      if (!isValidName(name)) {
        info.info('AlertInfo.login.invalidUsername')
        return false
      }

      if (!isValidEmail(email)) {
        useMessage(10139, 'warn')
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
        useMessage(10140, 'warn')
        return false
      }

      if (!code.trim()) {
        useMessage(10141, 'warn')
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
