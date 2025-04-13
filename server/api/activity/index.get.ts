import UserModel from '~/server/models/user'
import MessageModel from '~/server/models/message'
import { markdownToText } from '~/utils/markdownToText'
import type { KunActivity } from '~/types/api/activity'

const getMessages = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const queryData = {
    type: { $in: ['upvoted', 'replied', 'commented', 'requested'] }
  }
  const totalCount = await MessageModel.countDocuments(queryData)
  const data = await MessageModel.find(queryData)
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'name', UserModel)
    .lean()

  const activities: KunActivity[] = data.map((message) => ({
    uid: message.sender_uid,
    name: message.user[0].name,
    tid: message.tid,
    gid: message.gid,
    type: message.type,
    content: markdownToText(message.content).slice(0, 50),
    time: message.time
  }))

  return { activities, totalCount }
}

export default defineEventHandler(async (event) => {
  const { page, limit }: KunPagination = await getQuery(event)
  if (limit !== '50') {
    return kunError(event, 10209)
  }

  const messages = await getMessages(parseInt(page), parseInt(limit))

  return messages
})
