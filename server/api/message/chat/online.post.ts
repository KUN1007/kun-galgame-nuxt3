import ChatRoomModel from '~/server/models/chat-room'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const { receiverUid }: { receiverUid: string } = getQuery(event)
  if (!receiverUid) {
    return 'receiverUid not found'
  }
  if (parseInt(receiverUid) === userInfo.uid) {
    return 'you cannot send message to yourself'
  }
  const roomId = generateRoomId(parseInt(receiverUid), uid)

  const room = await ChatRoomModel.findOne({ name: roomId }).lean()
  if (room) {
    return room.crid
  } else {
    const message = await ChatRoomModel.create({
      name: roomId,
      type: 'private',
      participants: [uid, receiverUid],
      last_message_time: Date.now()
    })

    return message.crid
  }
})
