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
  const validEmail = verifyVerificationCode(email, code)

  if (!validEmail) {
    return 10103
  }

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
    kunError(event, 10303)
    return
  }

  const result = await resetPasswordByEmail(email, code, newPassword)

  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE reset password by email successfully!'
})
