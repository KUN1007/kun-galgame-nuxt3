import UserModel from '~/server/models/user'
import ChatRoomModel from '~/server/models/chat-room'
import ChatMessageModel from '~/server/models/chat-message'
import type { Message } from '~/types/api/chat-message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid.toString()

  const { receiverUid }: { receiverUid: string } = getQuery(event)
  const receiverUidNumber = parseInt(receiverUid)
  if (!receiverUidNumber) {
    return 'receiverUid not found'
  }

  const { content } = await readBody(event)
  if (parseInt(receiverUid) === userInfo.uid) {
    return 'you cannot send message to yourself'
  }

  const user = await UserModel.findOne({ uid }).lean()

  const roomId = generateRoomId(parseInt(receiverUid), userInfo.uid)
  await ChatRoomModel.findOneAndUpdate(
    { name: roomId },
    {
      last_message: {
        content,
        time: Date.now(),
        sender_uid: uid,
        sender_name: user!.name
      }
    }
  )

  const message = await ChatMessageModel.create({
    chatroom_name: roomId,
    sender_uid: uid,
    receiver_uid: parseInt(receiverUid),
    content,
    status: 'sent'
  })

  const responseData: Message = {
    cmid: message.cmid,
    sender: {
      uid: user!.uid,
      name: user!.name,
      avatar: user!.avatar
    },
    receiverUid: parseInt(receiverUid),
    content: message.content,
    time: message.time,
    status: message.status,
    isRecalled: message.is_recalled,
    recalledTime: message.recalled_time,
    readBy: message.read_by,
    reactions: message.reactions
  }

  return responseData
})
