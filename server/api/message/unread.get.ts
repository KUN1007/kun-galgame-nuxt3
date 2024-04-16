import MessageModel from '~/server/models/message'

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

  if (message) {
    return 'Find unread message'
  }
})
