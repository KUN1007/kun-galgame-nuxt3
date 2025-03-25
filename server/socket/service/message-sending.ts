import UserModel from '@/server/models/user'
import ChatRoomModel from '@/server/models/chat-room'
import ChatMessageModel from '@/server/models/chat-message'
import type { Message } from '@/types/api/chat-message'

export const sendingMessage = async (
  uid: number,
  receiverUid: number,
  content: string
) => {
  const user = await UserModel.findOne({ uid }).lean()

  const roomId = generateRoomId(receiverUid, uid)
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
    receiver_uid: receiverUid,
    content,
    status: 'sent'
  })

  const responseData: Message = {
    cmid: message.cmid,
    chatroomName: message.chatroom_name,
    sender: {
      uid: user!.uid,
      name: user!.name,
      avatar: user!.avatar
    },
    receiverUid: receiverUid,
    content: message.content,
    time: message.time,
    status: message.status
  }

  return responseData
}
