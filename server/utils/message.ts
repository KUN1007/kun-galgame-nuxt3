import MessageModel from '../models/message'
import type { MessageType } from '~/types/api/message'

export const createMessage = async (
  senderUid: number,
  receiverUid: number,
  type: MessageType,
  content: string,
  tid?: number
) => {
  const newTopic = new MessageModel({
    sender_uid: senderUid,
    receiver_uid: receiverUid,
    time: Date.now(),
    type,
    content,
    tid,
  })

  return await newTopic.save()
}

// When user toggle like ans dislike, maybe send deduplication request
export const createDedupMessage = async (
  senderUid: number,
  receiverUid: number,
  type: MessageType,
  content: string,
  tid?: number
) => {
  const duplicatedMessage = await MessageModel.findOne({
    sender_uid: senderUid,
    receiver_uid: receiverUid,
    type,
    content,
    tid,
  })
  if (duplicatedMessage) {
    return
  }

  const newTopic = new MessageModel({
    sender_uid: senderUid,
    receiver_uid: receiverUid,
    time: Date.now(),
    type,
    content,
    tid,
  })

  return await newTopic.save()
}
