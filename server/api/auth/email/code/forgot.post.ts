import UserModel from '~/server/models/user'
import { isValidEmail } from '~/utils/validate'
import type { ForgotPasswordVerificationCodeRequestData } from '~/types/api/auth'

export default defineEventHandler(async (event) => {
  const { email }: ForgotPasswordVerificationCodeRequestData =
    await readBody(event)

  if (!isValidEmail(email)) {
    kunError(event, 10302)
    return
  }

  const emailCount = await UserModel.countDocuments({ email })
  if (!emailCount) {
    kunError(event, 10305)
    return
  }

  const result = await sendVerificationCodeEmail(event, email, 'forgot')
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE send forget password verification code successfully!'
})
