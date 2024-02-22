import MessageModel from '~/server/models/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  await MessageModel.updateMany({ receiver_uid: uid }, { status: 'read' })

  return 'MOEMOE read all message successfully!'
})
