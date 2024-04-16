import MessageModel from '~/server/models/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  await MessageModel.deleteMany({ receiver_uid: uid })

  return 'MOEMOE delete all message successfully!'
})
