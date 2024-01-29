import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const { bio }: { bio: string } = await readBody(event)

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  if (bio.length > 107) {
    kunError(event, 10106)
    return
  }

  await UserModel.updateOne({ uid: userInfo.uid }, { $set: { bio: bio } })

  return 'Moe Moe'
})
