import { useTempMessageStore } from '~/store/temp/message'
import { isValidEmail, isValidName, isValidPassword } from '~/utils/validate'
import type { Pinia } from '@pinia/nuxt/dist/runtime/composables'

export const checkLoginForm = {
  asyncData($pinia: Pinia) {
    const info = useTempMessageStore($pinia)

    const checkUsername = (name: string) => {
      if (!name.trim()) {
        useMessage('Username cannot be empty', '用户名不可为空', 'warn')
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
        useMessage('Password cannot be empty', '密码不可为空', 'warn')
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
  },
}
