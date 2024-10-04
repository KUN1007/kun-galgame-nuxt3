import UserModel from '~/server/models/user'
import ChatRoomModel from '~/server/models/chat-room'
import ChatMessageModel from '~/server/models/chat-message'
import type { AsideItem } from '~/types/api/message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const userId = userInfo.uid

  const chatRooms = await ChatRoomModel.find({
    participants: userId,
    'last_message.sender_uid': { $ne: 0 }
  }).sort({
    'last_message.time': -1
  })

  if (!chatRooms.length) {
    return []
  }

  const asideItems: AsideItem[] = await Promise.all(
    chatRooms.map(async (chatRoom) => {
      const lastMessage = chatRoom.last_message

      const readCount = await ChatMessageModel.countDocuments({
        chatroom_name: chatRoom.name
      })

      const unreadCount = await ChatMessageModel.countDocuments({
        chatroom_name: chatRoom.name,
        sender_uid: { $ne: userId },
        'read_by.uid': { $ne: userId }
      })

      const receiverUid = chatRoom.participants.filter((p) => p !== userId)[0]
      const receiver = await UserModel.findOne({ uid: receiverUid }).lean()

      const chatRoute =
        chatRoom.type === 'private' ? receiverUid.toString() : chatRoom.name
      const chatAvatar =
        chatRoom.type === 'private' ? receiver!.avatar : chatRoom.avatar

      return {
        content: lastMessage.content,
        time: lastMessage.time,
        count: readCount,
        unreadCount: unreadCount,
        route: chatRoute,
        title: receiver!.name,
        avatar: chatAvatar
      }
    })
  )

  return asideItems
})
