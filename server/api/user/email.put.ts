import UserModel from '~/server/models/user'
import { isValidEmail, isValidMailConfirmCode } from '~/utils/validate'
import type { UserUpdateEmailRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { codeSalt, email, code }: UserUpdateEmailRequestData =
    await readBody(event)

  if (
    !codeSalt ||
    codeSalt.length !== 64 ||
    !isValidEmail(email) ||
    !isValidMailConfirmCode(code)
  ) {
    return kunError(event, 10109)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const codeKey = `${codeSalt}:${email}`
  const isCodeValid = await verifyVerificationCode(codeKey, code)
  if (!isCodeValid) {
    return kunError(event, 10103)
  }
  await useStorage('redis').removeItem(codeKey)

  await UserModel.updateOne({ uid: userInfo.uid }, { $set: { email } })

  return 'Moe Moe'
})
