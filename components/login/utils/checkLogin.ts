import { useComponentMessageStore } from '~/store/temp/components/message'
import { isValidEmail, isValidName, isValidPassword } from '~/utils/validate'
import type { Pinia } from 'pinia'

export const checkLoginForm = {
  asyncData($pinia: Pinia) {
    const info = useComponentMessageStore($pinia)

    const checkUsername = (name: string) => {
      if (!name.trim()) {
        useMessage(10136, 'warn')
        return false
      }

      if (!isValidName(name) && !isValidEmail(name)) {
        info.info('AlertInfo.login.invalidUsername')
        return false
      }

      return true
    }

    const checkPassword = (password: string) => {
      if (!password.trim()) {
        useMessage(10137, 'warn')
        return false
      }
      if (!isValidPassword(password)) {
        info.info('AlertInfo.login.invalidPassword')
        return false
      }

      return true
    }

    const checkLogin = (name: string, password: string) => {
      if (!checkUsername(name) || !checkPassword(password)) {
        return false
      }

      return true
    }

    return checkLogin
  }
}
