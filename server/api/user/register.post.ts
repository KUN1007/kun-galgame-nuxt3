import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import UserModel from '~/server/models/user'
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidMailConfirmCode,
} from '~/utils/validate'
import type { H3Event } from 'h3'
import type { RegisterRequestData, LoginResponseData } from '~/types/api/user'

const registerController = async (event: H3Event) => {
  const { name, email, password, code }: RegisterRequestData =
    await readBody(event)

  const ip =
    event.node.req.socket.remoteAddress ||
    event.node.req.headers['x-forwarded-for'] ||
    ''

  if (
    !isValidEmail(email) ||
    !isValidName(name) ||
    !isValidPassword(password) ||
    !isValidMailConfirmCode(code)
  ) {
    kunError(event, 10107)
    return
  }

  const registerCD = await useStorage('redis').getItem(`registerCD:${name}`)
  if (registerCD) {
    kunError(event, 10113)
    return
  } else {
    useStorage('redis').setItem(`registerCD:${ip}`, ip, { ttl: 60 })
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
    kunError(event, 10103)
    return
  }

  const usernameCount = await UserModel.countDocuments({
    name: { $regex: new RegExp('^' + name + '$', 'i') },
  })
  if (usernameCount > 0) {
    kunError(event, 10105)
    return
  }

  const emailCount = await UserModel.countDocuments({ email })
  if (emailCount > 0) {
    kunError(event, 10104)
    return
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const hashedPassword = await bcrypt.hash(password, 7)

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      ip,
    })
    await user.save()

    const { token, refreshToken } = await createTokens(user.uid, user.name)
    setCookie(event, 'kungalgame-is-navigate-to-login', '0')
    setCookie(event, 'kungalgame-moemoe-refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const userInfo: LoginResponseData = {
      uid: user.uid,
      name: user.name,
      avatar: user.avatar,
      moemoepoint: user.moemoepoint,
      roles: user.roles,
      token,
    }

    await session.commitTransaction()
    session.endSession()

    return userInfo
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
})
