import ChatMessageModel from '~/server/models/chat-message'
import socketServer from '~/server/socket/socket'

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

  socketServer.io?.to(message.crid).emit('message_recalled', cmid)

  return 'Successfully recalled the message'
})
