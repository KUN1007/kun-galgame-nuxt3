import { navigateTo } from 'nuxt/app'
import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const { bio }: { bio: string } = await readBody(event)

  const userInfo = getCookieTokenInfo(event)

  if (!userInfo) {
    navigateTo('/')
    kunError(event, 10115)
    return
  }

  const uidNumber = userInfo.uid
  if (uidNumber <= 0 && typeof uidNumber !== 'number') {
    kunError(event, 10114)
    return
  }

  if (bio.length > 107) {
    kunError(event, 10106)
    return
  }

  await UserModel.updateOne({ uidNumber }, { $set: { bio: bio } })

  return 'Moe Moe'
})
