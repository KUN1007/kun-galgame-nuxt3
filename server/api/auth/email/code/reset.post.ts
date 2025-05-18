import UserModel from '~/server/models/user'
import { isValidEmail } from '~/utils/validate'
import type { ForgotPasswordVerificationCodeRequestData } from '~/types/api/auth'

export default defineEventHandler(async (event) => {
  const { email }: ForgotPasswordVerificationCodeRequestData =
    await readBody(event)

  if (!isValidEmail(email)) {
    return kunError(event, 10302)
  }

  const emailCounts = await UserModel.countDocuments({ email })
  if (emailCounts) {
    return kunError(event, 10104)
  }

  const result = await sendVerificationCodeEmail(event, email, 'reset')
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return result
})
