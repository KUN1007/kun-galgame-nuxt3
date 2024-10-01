import MessageModel from '~/server/models/message'
import MessageAdminModel from '~/server/models/message-admin'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const message = await MessageModel.findOne({
    receiver_uid: uid,
    status: 'unread'
  })

  const messageAdmin = await MessageAdminModel.findOne({
    status: 'unread'
  })

  if (message || messageAdmin) {
    return 'Find unread message'
  } else {
    return 'Moe loli online!'
  }
})
