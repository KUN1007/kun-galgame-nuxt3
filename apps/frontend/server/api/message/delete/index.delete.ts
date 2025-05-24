import MessageModel from '~/server/models/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const { mid }: { mid: string } = await getQuery(event)
  if (!mid) {
    return kunError(event, 10507)
  }

  await MessageModel.deleteOne({ receiver_uid: uid, mid })

  return 'MOEMOE delete message successfully!'
})
