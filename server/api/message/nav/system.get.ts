import MessageModel from '~/server/models/message'
import MessageAdminModel from '~/server/models/message-admin'
import type { AsideItem } from '~/types/api/chat-message'

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
    MessageModel.findOne({ receiver_uid: uid }).sort({ time: -1 }).lean(),
    MessageModel.countDocuments({ receiver_uid: uid }),
    MessageModel.countDocuments({ receiver_uid: uid, status: 'unread' }),
    MessageAdminModel.findOne().sort({ time: -1 }).lean(),
    MessageAdminModel.countDocuments(),
    MessageAdminModel.countDocuments({ status: 'unread' })
  ])

  const responseData: AsideItem[] = [
    {
      chatroomName: '',
      content: message ? message.content.slice(0, 100) : '',
      time: message?.time || 0,
      count: messageCount,
      unreadCount: messageUnreadCount,
      route: 'notice',
      title: 'zako~',
      avatar: ''
    },
    {
      chatroomName: '',
      content: '',
      time: messageAdmin?.time || 0,
      count: messageAdminCount,
      unreadCount: messageAdminUnreadCount,
      route: 'system',
      title: 'zako~',
      avatar: ''
    }
  ]

  return responseData
})
