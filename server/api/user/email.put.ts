import UserModel from '~/server/models/user'
import { isValidEmail, isValidMailConfirmCode } from '~/utils/validate'
import type { UserUpdateEmailRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { email, code }: UserUpdateEmailRequestData = await readBody(event)

  if (!isValidEmail(email) || !isValidMailConfirmCode(code)) {
    kunError(event, 10109)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const isCodeValid = await verifyVerificationCode(email, code)
  if (!isCodeValid) {
    kunError(event, 10103)
    return
  }

  await UserModel.updateOne({ uid: userInfo.uid }, { $set: { email } })

  return 'Moe Moe'
})
