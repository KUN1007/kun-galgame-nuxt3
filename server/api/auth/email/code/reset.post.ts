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

  const emailCounts = await UserModel.countDocuments({ email })
  if (emailCounts) {
    kunError(event, 10104)
    return
  }

  const result = await sendVerificationCodeEmail(event, email, 'reset')
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE send reset email verification code successfully!'
})
