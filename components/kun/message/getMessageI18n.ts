import type { Message } from '~/types/api/message'

type Locale = 'en' | 'zh' | string

const zhMessageMap: Record<string, string> = {
  topic: '话题',
  reply: '回复',
  comment: '评论',

  upvoted: '推',
  liked: '点赞',
  replied: '回复',
  commented: '评论',
}

const getMessageZh = (locale: Locale, content: string) => {
  if (locale === 'zh') {
    return zhMessageMap[content]
  }
  return content
}

const getMentionedMessage = (locale: Locale, message: Message) => {
  if (locale === 'zh') {
    return `${message.senderName}提到了您！`
  }
  return `${message.senderName} mentioned you!`
}

export const getMessageI18n = (locale: Locale, message: Message) => {
  if (message.type === 'mentioned') {
    return getMentionedMessage(locale, message)
  }

  if (message.type === 'admin') {
    return message.content
  }

  if (locale === 'zh') {
    const contentZH = getMessageZh(locale, message.content ?? '')
    const actionZH = getMessageZh(locale, message.type)
    const messageContentZH = `您的${contentZH}被 ${message.senderName} ${actionZH}！`
    return messageContentZH
  }

  const messageContentEN = `Your ${message.content} was ${message.type} by ${message.senderName}!`
  return messageContentEN
}
