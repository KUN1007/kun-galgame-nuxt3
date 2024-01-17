import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    kunError(event, 10101)
    return
  }

  const email = user.email
  const atIndex = email.indexOf('@')
  const localPart = email.slice(0, atIndex)
  const domain = email.slice(atIndex)

  const maskedLocalPart = localPart.slice(0, 2) + '~~~~~~~'

  return maskedLocalPart + domain
})
