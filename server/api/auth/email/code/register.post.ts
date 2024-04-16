import UserModel from '~/server/models/user'
import { isValidEmail } from '~/utils/validate'
import type { RegisterVerificationCodeRequestData } from '~/types/api/auth'

export default defineEventHandler(async (event) => {
  const { name, email }: RegisterVerificationCodeRequestData =
    await readBody(event)

  if (!isValidEmail(email)) {
    return kunError(event, 10302)
  }

  const usernameCount = await UserModel.countDocuments({
    name: { $regex: new RegExp('^' + name + '$', 'i') }
  })
  if (usernameCount > 0) {
    return kunError(event, 10105)
  }

  const emailCount = await UserModel.countDocuments({ email })
  if (emailCount > 0) {
    return kunError(event, 10104)
  }

  const result = await sendVerificationCodeEmail(event, email, 'register')

  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE send register verification code successfully!'
})
