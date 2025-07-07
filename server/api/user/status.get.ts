import prisma from '~/prisma/prisma'
import type { HomeUserStatus } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const uid = userInfo.uid

  const user = await prisma.user.findUnique({
    where: { id: uid }
  })
  if (!user) {
    return kunError(event, '未找到该用户')
  }

  const message = await prisma.message.count({
    where: { receiver_id: uid, status: 'unread' }
  })

  const messageAdmin = await prisma.message.count({
    where: { status: 'unread' }
  })

  const chatMessage = await prisma.chat_message.count({
    where: { receiver_id: uid, read_by: { some: { user_id: { not: uid } } } }
  })

  const responseData: HomeUserStatus = {
    moemoepoints: user.moemoepoint,
    isCheckIn: user.daily_check_in === 1,
    hasNewMessage: !!(message || messageAdmin || chatMessage)
  }

  return responseData
})
