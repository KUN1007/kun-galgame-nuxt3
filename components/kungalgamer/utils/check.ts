export const checkSendCode = (email: string) => {
  if (!email) {
    useMessage(10125, 'warn')
    return false
  }

  if (!isValidEmail(email)) {
    useMessage(10126, 'warn')
    return false
  }

  return true
}

export const checkResetEmail = (
  hasSentCodeEmail: string,
  newEmail: string,
  code: string
) => {
  if (!hasSentCodeEmail) {
    useMessage(10127, 'warn')
    return false
  }

  if (hasSentCodeEmail !== newEmail) {
    useMessage(10128, 'warn')
    return false
  }

  if (!code) {
    useMessage(10129, 'warn')
  }

  if (!isValidMailConfirmCode(code)) {
    useMessage(10130, 'warn')
    return false
  }
  return true
}

export const checkChangePassword = (
  oldPassword: string,
  newPassword: string,
  repeatPassword: string
) => {
  if (!oldPassword) {
    useMessage(10131, 'warn')
    return false
  }
  if (!newPassword) {
    useMessage(10132, 'warn')
    return false
  }
  if (!repeatPassword) {
    useMessage(10133, 'warn')
    return false
  }

  if (newPassword !== repeatPassword) {
    useMessage(10134, 'warn')
    return false
  }

  if (!isValidPassword(oldPassword) || !isValidPassword(newPassword)) {
    useMessage(10308, 'warn', 5000)
    return false
  }
  return true
}
