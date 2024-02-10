import UserModel from '~/server/models/user'
import { isValidEmail } from '~/utils/validate'
import type { RegisterVerificationCodeRequestData } from '~/types/api/auth'

export default defineEventHandler(async (event) => {
  const { name, email }: RegisterVerificationCodeRequestData =
    await readBody(event)

  if (!isValidEmail(email)) {
    console.log('register auth email valid error', event)

    kunError(event, 10302)
    return
  }

  const usernameCount = await UserModel.countDocuments({
    name: { $regex: new RegExp('^' + name + '$', 'i') },
  })
  if (usernameCount > 0) {
    console.log('register auth username duplicated error', event)

    kunError(event, 10105)
    return
  }

  const emailCount = await UserModel.countDocuments({ email })
  if (emailCount > 0) {
    console.log('register auth email duplicated error', event)

    kunError(event, 10104)
    return
  }

  const result = await sendVerificationCodeEmail(event, email, 'register')

  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE send register verification code successfully!'
})
