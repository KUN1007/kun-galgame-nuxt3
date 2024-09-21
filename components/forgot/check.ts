export const checkEmail = (email: string) => {
  if (!email.trim()) {
    useMessage(10301, 'warn')
    return false
  }

  if (email.trim().length > 100) {
    useMessage(10302, 'warn')
    return false
  }

  if (!isValidEmail(email)) {
    useMessage(10303, 'warn')
    return false
  }

  return true
}

export const checkCode = (email: string, code: string) => {
  if (!checkEmail(email)) {
    return false
  }

  if (!isValidMailConfirmCode(code)) {
    useMessage(10304, 'warn')
    return false
  }

  return true
}

export const checkPassword = (newPassword: string, confirmPassword: string) => {
  if (!newPassword) {
    useMessage(10305, 'warn')
    return false
  }
  if (!confirmPassword) {
    useMessage(10306, 'warn')
    return false
  }

  if (newPassword !== confirmPassword) {
    useMessage(10307, 'warn')
    return false
  }

  if (!isValidPassword(confirmPassword) || !isValidPassword(newPassword)) {
    useMessage(10308, 'warn', 7777)
    return false
  }
  return true
}
