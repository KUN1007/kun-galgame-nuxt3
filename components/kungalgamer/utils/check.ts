export const checkSendCode = (email: string) => {
  if (!email) {
    useMessage('Please input your new email!', '请输入您的新邮箱！', 'warn')
    return false
  }

  if (!isValidEmail(email)) {
    useMessage(
      'Please input valid email format!',
      '请输入有效的邮箱格式！',
      'warn'
    )
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
    useMessage(
      'Please send the email verification code first!',
      '请先发送邮箱验证码！',
      'warn'
    )
    return false
  }

  if (hasSentCodeEmail !== newEmail) {
    useMessage(
      'The email to which the verification code has been sent is different from the one you want to change.',
      '已经发送验证码的邮箱与要更改的邮箱不相等！',
      'warn'
    )
    return false
  }

  if (!code) {
    useMessage(
      'Email verification code cannot be empty!',
      '邮箱验证码不可为空！',
      'warn'
    )
  }

  if (!isValidMailConfirmCode(code)) {
    useMessage(
      'Invalid email verification code format!',
      '非法的邮箱验证码格式！',
      'warn'
    )
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
    useMessage('Old password cannot be empty!', '旧密码不可为空！', 'warn')
    return false
  }
  if (!newPassword) {
    useMessage('New password cannot be empty!', '新密码不可为空！', 'warn')
    return false
  }
  if (!repeatPassword) {
    useMessage('Please input new password again!', '请再次输入新密码！', 'warn')
    return false
  }

  if (newPassword !== repeatPassword) {
    useMessage(
      'The two password entries do not match',
      '两次输入密码不一致',
      'warn'
    )
    return false
  }

  if (!isValidPassword(oldPassword) || !isValidPassword(newPassword)) {
    useMessage(
      'Invalid password format.\nPassword must be 6 to 17 characters long and must include at least one letter and one number.\nIt can optionally include special characters such as \\w!@#$%^&()-+=',
      '非法的密码格式，密码的长度为 6 到 17 位，必须包含至少一个英文字符和一个数字，可以选择性的包含 \\w!@#$%^&*()_-+=\\/ 等特殊字符',
      'warn',
      5000
    )
    return false
  }
  return true
}
