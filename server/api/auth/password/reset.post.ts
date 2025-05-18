import { hash } from 'bcrypt'
import UserModel from '~/server/models/user'
import {
  isValidEmail,
  isValidMailConfirmCode,
  isValidPassword
} from '~/utils/validate'
import type { ResetPasswordByEmailRequestData } from '~/types/api/auth'

const resetPasswordByEmail = async (
  email: string,
  code: string,
  newPassword: string
) => {
  const codeKey = `forgot:${email}`
  const validEmail = verifyVerificationCode(codeKey, code)
  if (!validEmail) {
    return 10103
  }
  await useStorage('redis').removeItem(codeKey)

  const hashedPassword = await hash(newPassword, 7)

  const user = await UserModel.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } }
  )

  if (!user) {
    return 10101
  }
}

export default defineEventHandler(async (event) => {
  const { email, code, newPassword }: ResetPasswordByEmailRequestData =
    await readBody(event)

  if (
    !isValidEmail(email) ||
    !isValidMailConfirmCode(code) ||
    !isValidPassword(newPassword)
  ) {
    return kunError(event, 10303)
  }

  const result = await resetPasswordByEmail(email, code, newPassword)

  if (typeof result === 'number') {
    return kunError(event, result)
  }

  return 'MOEMOE reset password by email successfully!'
})
