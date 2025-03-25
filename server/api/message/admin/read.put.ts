import MessageAdminModel from '@/server/models/message-admin'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  await MessageAdminModel.updateMany({}, { status: 'read' })

  return 'MOEMOE read all messages successfully!'
})
