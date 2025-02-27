import UserModel from '~/server/models/user'
import MessageModel from '~/server/models/message'
import { markdownToText } from '~/utils/markdownToText'
import type { HomeMessage } from '~/types/api/home'

const getMessages = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const data = await MessageModel.find({
    type: { $in: ['upvoted', 'replied', 'commented', 'requested'] }
  })
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'name', UserModel)
    .lean()

  const messages: HomeMessage[] = data.map((message) => ({
    uid: message.sender_uid,
    name: message.user[0].name,
    tid: message.tid,
    gid: message.gid,
    type: message.type,
    content: markdownToText(message.content).slice(0, 50),
    time: message.time
  }))

  return messages
}

export default defineEventHandler(async (event) => {
  const { page, limit }: KunPagination = await getQuery(event)
  if (limit !== '10') {
    return kunError(event, 10209)
  }

  const messages = await getMessages(parseInt(page), parseInt(limit))

  return messages
})
