import bcrypt from 'bcrypt'
import UserModel from '~/server/models/user'
import {
  isValidEmail,
  isValidMailConfirmCode,
  isValidPassword,
} from '~/utils/validate'
import type { UserResetPasswordByEmailRequestData } from '~/types/api/user'

const resetPasswordByEmail = async (
  email: string,
  code: string,
  newPassword: string
) => {
  const validEmail = verifyVerificationCode(email, code)

  if (!validEmail) {
    return 10103
  }

  const hashedPassword = await bcrypt.hash(newPassword, 7)

  const user = await UserModel.findOneAndUpdate(
    { email: email },
    { $set: { password: hashedPassword } }
  )

  if (!user) {
    return 10101
  }
}

export default defineEventHandler(async (event) => {
  const { email, code, newPassword }: UserResetPasswordByEmailRequestData =
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

  return 'MOEMOE!'
})
