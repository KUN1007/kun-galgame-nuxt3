import UserModel from '@/server/models/user'
import ChatMessageModel from '@/server/models/chat-message'
import ChatRoomModel from '@/server/models/chat-room'
import type { MessageHistoryRequest, Message } from '@/types/api/chat-message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const { receiverUid, page, limit }: MessageHistoryRequest = getQuery(event)
  if (!receiverUid || !page || !limit) {
    return kunError(event, 10507)
  }
  if (parseInt(receiverUid) === userInfo.uid) {
    return kunError(event, 10401)
  }
  if (limit !== '30') {
    return kunError(event, 10209)
  }
  const roomId = generateRoomId(parseInt(receiverUid), uid)

  const room = await ChatRoomModel.findOne({ name: roomId }).lean()
  if (!room) {
    await ChatRoomModel.create({
      name: roomId,
      type: 'private',
      participants: [uid, receiverUid],
      last_message: { time: Date.now() }
    })

    return []
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const histories = await ChatMessageModel.find({ chatroom_name: roomId })
    .sort({ cmid: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const cmidArray = histories
    .filter((message) => !message.read_by.some((read) => read.uid === uid))
    .map((message) => message.cmid)
  if (cmidArray.length > 0) {
    await ChatMessageModel.updateMany(
      { cmid: { $in: cmidArray }, 'read_by.uid': { $ne: uid } },
      { $push: { read_by: { uid, read_time: Date.now() } } }
    )
  }

  const messages: Message[] = histories.map((message) => ({
    cmid: message.cmid,
    chatroomName: message.chatroom_name,
    sender: {
      uid: message.user[0].uid,
      name: message.user[0].name,
      avatar: message.user[0].avatar
    },
    receiverUid: parseInt(receiverUid),
    content: message.content,
    time: message.time,
    status: message.status
  }))

  return messages.reverse()
})
