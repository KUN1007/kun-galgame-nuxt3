import UserModel from '~/server/models/user'
import { isValidEmail } from '~/utils/validate'
import { KUN_ALLOW_REGISTER_EMAIL } from '~/config/email-whitelist'
import {
  ADMIN_DELETE_EMAIL_CACHE_KEY,
  ADMIN_DELETE_IP_CACHE_KEY,
  KUN_FORUM_DISABLE_REGISTER_KEY
} from '~/config/admin'
import type { RegisterVerificationCodeRequestData } from '~/types/api/auth'

export default defineEventHandler(async (event) => {
  const { name, email }: RegisterVerificationCodeRequestData =
    await readBody(event)
  if (!isValidEmail(email)) {
    return kunError(event, 10302)
  }

  const isDisableRegister = await useStorage('redis').getItem(
    KUN_FORUM_DISABLE_REGISTER_KEY
  )
  if (isDisableRegister) {
    return kunError(event, 10308)
  }

  const isDeletedUserEmail = await useStorage('redis').getItem(
    `${ADMIN_DELETE_EMAIL_CACHE_KEY}:${email}`
  )
  if (isDeletedUserEmail) {
    return kunError(event, 10306)
  }
  const authUserIp = getRemoteIp(event)
  const isDeletedUserIp = await useStorage('redis').getItem(
    `${ADMIN_DELETE_IP_CACHE_KEY}:${authUserIp}`
  )
  if (isDeletedUserIp) {
    return kunError(event, 10307)
  }

  const emailDomain = email.split('@')[1]
  const isEmailAllowed = KUN_ALLOW_REGISTER_EMAIL.some(
    (whitelistedDomain) => whitelistedDomain === emailDomain
  )
  if (!isEmailAllowed) {
    return kunError(event, 10305)
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
