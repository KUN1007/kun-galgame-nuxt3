import MessageModel from '../models/message'
import type {
  RelatedContent,
  MessageStatus,
  MessageType,
} from '~/types/api/message'

export const createMessage = async (
  senderUid: number,
  receiverUid: number,
  status: MessageStatus,
  type: MessageType,
  content?: RelatedContent | string,
  tid?: number
) => {
  const newTopic = new MessageModel({
    sender_uid: senderUid,
    receiver_uid: receiverUid,
    status,
    type,
    content,
    tid,
  })

  return await newTopic.save()
}
