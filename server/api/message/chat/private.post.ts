import UserModel from '~/server/models/user'
import ChatRoomModel from '~/server/models/chat-room'
import ChatMessageModel from '~/server/models/chat-message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid.toString()

  const { crid, receiverUid }: { crid: number; receiverUid: string } =
    getQuery(event)
  if (!receiverUid) {
    return 'receiverUid not found'
  }

  const { content } = await readBody(event)
  if (parseInt(receiverUid) === userInfo.uid) {
    return 'you cannot send message to yourself'
  }
  const roomId = generateRoomId(parseInt(receiverUid), userInfo.uid)

  const message = await ChatMessageModel.create({
    crid,
    sender_uid: uid,
    content
  })

  await ChatRoomModel.updateOne(
    { name: roomId },
    { lastMessageTime: Date.now() }
  )

  const sender = await UserModel.findOne({ uid }).lean()

  return {
    ...message,
    sender: {
      uid: sender!.uid,
      name: sender!.name,
      avatar: sender!.avatar
    }
  }
})
