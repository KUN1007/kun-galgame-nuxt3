import MessageModel from '~/server/models/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  await MessageModel.updateMany({ receiver_uid: uid }, { status: 'read' })

  return 'MOEMOE read all message successfully!'
})
