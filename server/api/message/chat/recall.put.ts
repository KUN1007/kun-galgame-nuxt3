import ChatMessageModel from '~/server/models/chat-message'

export default defineEventHandler(async (event) => {
  const { cmid }: { cmid: string } = getQuery(event)
  if (!cmid) {
    return 'cmid read error'
  }

  const message = await ChatMessageModel.findOne({ cmid })
  if (!message) {
    return 'Message not found'
  }

  if (!message.is_recalled) {
    await ChatMessageModel.updateOne(
      { cmid },
      {
        is_recalled: true,
        recalled_time: Date.now()
      }
    )
  }

  return 'Successfully recalled the message'
})
