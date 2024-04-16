import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    return kunError(event, 10101)
  }

  const email = user.email
  const atIndex = email.indexOf('@')
  const localPart = email.slice(0, atIndex)
  const domain = email.slice(atIndex)

  const maskedLocalPart = localPart.slice(0, 2) + '~~~~~~~'

  return maskedLocalPart + domain
})
