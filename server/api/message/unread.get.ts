import prisma from '~/prisma/prisma'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const uid = userInfo.uid

  const message = await prisma.message.count({
    where: { receiver_id: uid, status: 'unread' }
  })

  const messageAdmin = await prisma.message.count({
    where: { status: 'unread' }
  })

  const chatMessage = await prisma.chat_message.count({
    where: { receiver_id: uid, read_by: { some: { user_id: { not: uid } } } }
  })

  if (message || messageAdmin || chatMessage) {
    return 'Find unread message'
  } else {
    return 'Moe loli online!'
  }
})
