import MessageModel from '~/server/models/message'

export default defineEventHandler(async (event) => {
  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115)
    return
  }
  const uid = userInfo.uid

  const { mid }: { mid: string } = await getQuery(event)
  if (!mid) {
    kunError(event, 10507)
    return
  }

  const message = await MessageModel.findOne({ receiver_uid: uid, mid })

  return message?.content
})
