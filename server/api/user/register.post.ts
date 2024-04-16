import mongoose from 'mongoose'
import { hash } from 'bcrypt'
import UserModel from '~/server/models/user'
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidMailConfirmCode
} from '~/utils/validate'
import type { H3Event } from 'h3'
import type { RegisterRequestData, LoginResponseData } from '~/types/api/user'

const registerController = async (event: H3Event) => {
  const { name, email, password, code }: RegisterRequestData =
    await readBody(event)

  const ip = getRemoteIp(event)

  if (
    !isValidEmail(email) ||
    !isValidName(name) ||
    !isValidPassword(password) ||
    !isValidMailConfirmCode(code)
  ) {
    return kunError(event, 10107)
  }

  const registerCD = await useStorage('redis').getItem(
    `login:register:cd:${name}`
  )
  if (registerCD) {
    return kunError(event, 10113)
  } else {
    useStorage('redis').setItem(`login:register:cd:${ip}`, ip, { ttl: 60 })
  }

  return { name, email, password, code, ip }
}

export default defineEventHandler(async (event) => {
  const result = await registerController(event)
  if (!result) {
    return
  }
  const { name, email, password, code, ip } = result

  const isCodeValid = await verifyVerificationCode(email, code)
  if (!isCodeValid) {
    return kunError(event, 10103)
  }

  const usernameCount = await UserModel.countDocuments({
    name: { $regex: new RegExp('^' + name + '$', 'i') }
  })
  if (usernameCount) {
    return kunError(event, 10105)
  }

  const emailCount = await UserModel.countDocuments({ email })
  if (emailCount) {
    return kunError(event, 10104)
  }
  const hashedPassword = await hash(password, 7)

  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
    ip
  })
  await user.save()

  const { token, refreshToken } = await createTokens(user.uid, user.name)
  deleteCookie(event, 'kungalgame-is-navigate-to-login')
  setCookie(event, 'kungalgame-moemoe-refresh-token', refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  })

  const userInfo: LoginResponseData = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    moemoepoint: user.moemoepoint,
    roles: user.roles,
    token
  }

  return userInfo
})
