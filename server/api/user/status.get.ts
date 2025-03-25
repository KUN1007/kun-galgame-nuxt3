import UserModel from '@/server/models/user'
import MessageModel from '@/server/models/message'
import MessageAdminModel from '@/server/models/message-admin'
import ChatMessageModel from '@/server/models/chat-message'
import type { HomeUserStatus } from '@/types/api/home'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const user = await UserModel.findOne(
    { uid },
    { moemoepoint: 1, daily_check_in: 1, _id: 0 }
  )
  if (!user) {
    return kunError(event, 10101)
  }

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

  const responseData: HomeUserStatus = {
    moemoepoints: user.moemoepoint,
    isCheckIn: user.daily_check_in === 1,
    hasNewMessage: !!(message || messageAdmin || chatMessage)
  }

  return responseData
})
