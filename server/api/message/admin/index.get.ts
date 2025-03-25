import UserModel from '@/server/models/user'
import MessageAdminModel from '@/server/models/message-admin'
import type { MessageAdmin } from '@/types/api/message-admin'

export default defineEventHandler(async (_) => {
  const messageAdmin = await MessageAdminModel.find()
    .sort({ maid: -1 })
    .populate('user', 'uid name avatar', UserModel)
    .lean()

  const data: MessageAdmin[] = messageAdmin.map((message) => ({
    maid: message.maid,
    time: message.time,
    status: message.status,
    content: message.content,
    admin: {
      uid: message.user[0].uid,
      name: message.user[0].name,
      avatar: message.user[0].avatar
    }
  }))

  return data
})
