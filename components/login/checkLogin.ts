import { isValidEmail, isValidName, isValidPassword } from '~/utils/validate'

const checkUsername = (name: string) => {
  if (!name.trim()) {
    useMessage(10136, 'warn')
    return false
  }

  if (!isValidName(name) && !isValidEmail(name)) {
    useKunLoliInfo('非法的用户名，用户名为 1~17 位任意字符')
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
    useKunLoliInfo(
      '非法的密码格式，密码的长度为 6 到 107 位，必须包含至少一个英文字符和一个数字，可以选择性的包含 @!#$%^&*()_-+=\\/ 等特殊字符'
    )
    return false
  }

  return true
}

export const checkLogin = (name: string, password: string) => {
  if (!checkUsername(name) || !checkPassword(password)) {
    return false
  }

  return true
}
