import UserModel from '~/server/models/user'
import { userUpdateEmailSchema } from '~/validations/user'

export default defineEventHandler(async (event) => {
  const input = await kunParsePutBody(event, userUpdateEmailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }

  const { codeSalt, email, code } = input

  const codeKey = `${codeSalt}:${email}`
  const isCodeValid = await verifyVerificationCode(codeKey, code)
  if (!isCodeValid) {
    return kunError(event, '错误的邮箱验证码')
  }
  await useStorage('redis').removeItem(codeKey)

  await UserModel.updateOne({ uid: userInfo.uid }, { $set: { email } })

  return 'Moe Moe'
})
