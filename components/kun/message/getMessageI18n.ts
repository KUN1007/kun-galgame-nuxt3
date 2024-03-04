import type { Message } from '~/types/api/message'

type Locale = 'en-us' | 'zh-cn' | string

const zhMessageMap: Record<string, string> = {
  upvoted: '推了',
  liked: '点赞了',
  replied: '回复了',
  commented: '评论了'
}

export const getMessageZH = (locale: Locale, content: string) => {
  if (locale === 'zh-cn') {
    return zhMessageMap[content]
  }
  return content
}

const getMentionedMessage = (locale: Locale, message: Message) => {
  if (locale === 'zh-cn') {
    return `${message.senderName}提到了您！`
  }
  return `${message.senderName} mentioned you!`
}

export const getMessageI18n = (locale: Locale, message: Message) => {
  if (message.type === 'mentioned') {
    return getMentionedMessage(locale, message)
  }

  if (message.type === 'admin') {
    if (locale === 'zh-cn') {
      return '系统消息'
    }
    return 'System message'
  }

  if (locale === 'zh-cn') {
    const actionZH = getMessageZH(locale, message.type)
    const messageContentZH = `${message.senderName} ${actionZH}您！`
    return messageContentZH
  }

  const messageContentEN = `${message.senderName} ${message.type} you!`
  return messageContentEN
}
