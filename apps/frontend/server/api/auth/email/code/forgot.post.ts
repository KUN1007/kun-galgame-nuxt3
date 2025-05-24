import UserModel from '~/server/models/user'
import { isValidEmail } from '~/utils/validate'
import type { ForgotPasswordVerificationCodeRequestData } from '~/types/api/auth'

export default defineEventHandler(async (event) => {
  const { email }: ForgotPasswordVerificationCodeRequestData =
    await readBody(event)

  if (!isValidEmail(email)) {
    return kunError(event, 10302)
  }

  const emailCount = await UserModel.countDocuments({ email })
  if (!emailCount) {
    return kunError(event, 10304)
  }

  const result = await sendVerificationCodeEmail(event, email, 'forgot')
  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return result
})
