import type { Message } from '~/types/api/message'

type Locale = 'en-us' | 'zh-cn' | string

const zhMessageMap: Record<string, string> = {
  upvoted: '推了您！',
  liked: '点赞了您！',
  favorite: '收藏了您！',
  replied: '回复了您！',
  commented: '评论了您！',
  expired: '报告了您的资源链接已过期!'
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

const getExpiredMessage = (locale: Locale, message: Message) => {
  if (locale === 'zh-cn') {
    return `${message.senderName} 报告了您的资源链接已过期！`
  }
  return `${message.senderName} report for your resource link has expired!`
}

export const getMessageI18n = (locale: Locale, message: Message) => {
  if (message.type === 'admin') {
    if (locale === 'zh-cn') {
      return '系统消息'
    }
    return 'System message'
  }

  if (message.type === 'mentioned') {
    return getMentionedMessage(locale, message)
  }

  if (message.type === 'expired') {
    return getExpiredMessage(locale, message)
  }

  if (locale === 'zh-cn') {
    const actionZH = getMessageZH(locale, message.type)
    const messageContentZH = `${message.senderName} ${actionZH}`
    return messageContentZH
  }

  const messageContentEN = `${message.senderName} ${message.type} you!`
  return messageContentEN
}
