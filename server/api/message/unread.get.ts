import MessageModel from '@/server/models/message'
import MessageAdminModel from '@/server/models/message-admin'
import ChatMessageModel from '@/server/models/chat-message'

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

  const chatMessage = await ChatMessageModel.findOne({
    receiver_uid: uid,
    'read_by.uid': { $ne: uid }
  })

  if (message || messageAdmin || chatMessage) {
    return 'Find unread message'
  } else {
    return 'Moe loli online!'
  }
})
