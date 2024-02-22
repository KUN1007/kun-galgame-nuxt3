import MessageModel from '~/server/models/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const { mid }: { mid: string } = await getQuery(event)
  if (!mid) {
    kunError(event, 10507)
    return
  }

  await MessageModel.deleteOne({ receiver_uid: uid, mid })

  return 'MOEMOE delete message successfully!'
})
