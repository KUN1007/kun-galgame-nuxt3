export const checkForm = (
  name: string,
  email: string,
  password: string
): boolean => {
  if (!name.trim() || !email.trim() || !password.trim()) {
    useMessage(10138, 'warn')
    return false
  }

  if (!isValidName(name)) {
    useKunLoliInfo('非法的用户名，用户名为 1~17 位任意字符')
    return false
  }

  if (!isValidEmail(email)) {
    useMessage(10139, 'warn')
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

export const checkRegister = (isSendCode: boolean, code: string) => {
  if (!isSendCode) {
    useMessage(10140, 'warn')
    return false
  }

  if (!code.trim()) {
    useMessage(10141, 'warn')
    return false
  }

  if (!isValidMailConfirmCode(code)) {
    useKunLoliInfo('非法的邮箱验证码格式，邮箱验证码必须为 7 位数字或字母')
    return false
  }

  return true
}
