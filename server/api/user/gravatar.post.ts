import UserModel from '~/server/models/user'
import { digestMessage } from "~/server/utils/cryto";

export default defineEventHandler(async event => {
  const { enable }: { enable: boolean } = await readBody(event)

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  let avatar = ''
  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    kunError(event, 10101)
    return
  }

  if (enable) {
    const emailHash = await digestMessage(user.email.toLowerCase())
    avatar = `https://www.gravatar.com/avatar/${emailHash}`
  } else {
    const isGravatar = user.avatar.startsWith('https://www.gravatar.com/avatar')
    if(!isGravatar) {
      kunError(event, 10121, 400)
      return
    }
  }

  await UserModel.updateOne({ uid: userInfo.uid }, { $set: { avatar } })

  return avatar
})
