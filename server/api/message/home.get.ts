import UserModel from '~/server/models/user'
import MessageModel from '~/server/models/message'
import type { HomeMessage } from '~/types/api/message'

export default defineEventHandler(async (event) => {
  const homeMessageCache: HomeMessage[] | null =
    await useStorage('redis').getItem(`home:message`)
  if (homeMessageCache) {
    return homeMessageCache
  }

  const data = await MessageModel.find({
    type: { $in: ['upvoted', 'replied', 'commented', 'requested'] }
  })
    .sort({ time: -1 })
    .limit(17)
    .populate('user', 'name', UserModel)
    .lean()

  const messages: HomeMessage[] = data.map((message) => ({
    uid: message.sender_uid,
    name: message.user[0].name,
    tid: message.tid,
    type: message.type,
    content: message.content.slice(0, 50),
    time: message.time
  }))

  await useStorage('redis').setItem(`home:message`, messages, {
    ttl: 60 * 60
  })

  return messages
})
