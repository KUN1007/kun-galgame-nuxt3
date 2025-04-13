import UserModel from '~/server/models/user'
import MessageModel from '~/server/models/message'
import { markdownToText } from '~/utils/markdownToText'
import type {
  KunActivityType,
  KunActivityRequestData,
  KunActivity
} from '~/types/api/activity'

const allowedMessageType = ['upvoted', 'replied', 'commented', 'requested']

const getMessages = async (
  page: number,
  limit: number,
  type: KunActivityType
) => {
  const skip = (page - 1) * limit

  const queryData = {
    type: type === 'all' ? { $in: allowedMessageType } : type
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
  const { page, limit, type }: KunActivityRequestData = await getQuery(event)
  if (limit !== '50') {
    return kunError(event, 10209)
  }
  if (!allowedMessageType.concat('all').includes(type)) {
    return kunError(event, 10402)
  }

  const messages = await getMessages(parseInt(page), parseInt(limit), type)

  return messages
})
