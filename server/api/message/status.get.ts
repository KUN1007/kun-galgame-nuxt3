import MessageModel from '~/server/models/message'
import MessageAdminModel from '~/server/models/message-admin'
import type { MessageAsideStatus } from '~/types/api/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const [
    message,
    messageCount,
    messageUnreadCount,
    messageAdmin,
    messageAdminCount,
    messageAdminUnreadCount
  ] = await Promise.all([
    MessageModel.findOne({ receiver_uid: uid, status: 'unread' }).lean(),
    MessageModel.countDocuments({ receiver_uid: uid }),
    MessageModel.countDocuments({ receiver_uid: uid, status: 'unread' }),
    MessageAdminModel.findOne({ status: 'unread' }).lean(),
    MessageAdminModel.countDocuments(),
    MessageAdminModel.countDocuments({ status: 'unread' })
  ])

  const responseData: MessageAsideStatus = {
    notice: {
      content: message ? message.content.slice(0, 100) : '',
      time: message?.time || 0,
      count: messageCount,
      unreadCount: messageUnreadCount
    },
    system: {
      time: messageAdmin?.time || 0,
      count: messageAdminCount,
      unreadCount: messageAdminUnreadCount
    }
  }

  return responseData
})
