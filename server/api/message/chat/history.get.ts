import UserModel from '~/server/models/user'
import ChatMessageModel from '~/server/models/chat-message'
import ChatRoomModel from '~/server/models/chat-room'
import type { MessageHistoryRequest } from '~/types/api/chat-message'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const { receiverUid, page, limit }: MessageHistoryRequest = getQuery(event)
  if (!receiverUid) {
    return 'receiverUid not found'
  }
  if (parseInt(receiverUid) === userInfo.uid) {
    return 'you cannot send message to yourself'
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
  const histories = await ChatMessageModel.find({ crid: room.crid })
    .sort({ cmid: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const messages = histories.map((message) => ({
    cmid: message.cmid,
    sender: {
      uid: message.user[0].uid,
      name: message.user[0].name,
      avatar: message.user[0].avatar
    },
    receiverUid: parseInt(receiverUid),
    content: message.content,
    time: message.time,
    status: message.status,
    isRecalled: message.is_recalled,
    recalledTime: message.recalled_time,
    readBy: message.read_by,
    reactions: message.reactions
  }))

  return messages.reverse()
})
