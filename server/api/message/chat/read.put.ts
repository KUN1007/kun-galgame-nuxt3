import ChatMessageModel from '~/server/models/chat-message'

export default defineEventHandler(async (event) => {
  const { cmid }: { cmid: string } = getQuery(event)
  if (!cmid) {
    return 'cmid read error'
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const message = await ChatMessageModel.findOne({ cmid })
  if (!message) {
    return 'Message not found'
  }

  const readUserArray = message.read_by.map((read) => read.uid)
  if (!readUserArray.includes(userInfo.uid)) {
    await ChatMessageModel.updateOne(
      { cmid },
      { $addToSet: { read_by: userInfo.uid } }
    )
  }

  return 'Read message successfully'
})
