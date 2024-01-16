import MessageModel from '~/server/models/message'
import type {
  MessageType,
  SortField,
  SortOrder,
  MessageRequestData,
  Message,
} from '~/types/api/message'

const getMessages = async (
  uid: number,
  page: number,
  limit: number,
  type: MessageType | '',
  sortField: SortField,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
  }
  const findOptions = type ? { receiver_uid: uid, type } : { receiver_uid: uid }

  const messages = await MessageModel.find(findOptions)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .populate('user', 'name')
    .lean()

  const responseData: Message[] = messages.map((message) => ({
    mid: message.mid,
    senderUid: message.sender_uid,
    // @ts-ignore
    senderName: message.user[0].name,
    receiverUid: message.receiver_uid,
    time: message.time,
    tid: message.tid,
    content: message.content,
    status: message.status,
    type: message.type,
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, type, sortField, sortOrder }: MessageRequestData =
    await getQuery(event)
  if (limit !== '10') {
    kunError(event, 10209)
    return
  }

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115)
    return
  }
  const uid = userInfo.uid

  const result = await getMessages(
    uid,
    parseInt(page),
    parseInt(limit),
    type ? type : '',
    sortField ? sortField : 'time',
    sortOrder
  )

  return result
})
