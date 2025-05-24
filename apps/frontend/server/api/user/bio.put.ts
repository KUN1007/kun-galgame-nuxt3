import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const { bio }: { bio: string } = await readBody(event)

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  if (bio.length > 107) {
    return kunError(event, 10106)
  }

  await UserModel.updateOne({ uid: userInfo.uid }, { $set: { bio } })

  return 'MoeMoe update bio successfully!'
})
