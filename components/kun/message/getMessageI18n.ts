import type { Message } from '~/types/api/message'

type Locale = 'en-us' | 'zh-cn' | string

const messageTemplates: Record<string, Record<string, string>> = {
  'zh-cn': {
    upvoted: '{{senderName}} 推了您!',
    liked: '{{senderName}} 点赞了您!',
    favorite: '{{senderName}} 收藏了您!',
    replied: '{{senderName}} 回复了您!',
    commented: '{{senderName}} 评论了您!',
    expired: '{{senderName}} 报告了您的资源链接已过期！',
    merged: '您的更新请求已被 {{senderName}} 合并！',
    declined: '您的更新请求被 {{senderName}} 拒绝！',
    admin: '系统消息',
    mentioned: '{{senderName}} 提到了您！'
  },
  'en-us': {
    upvoted: '{{senderName}} upvoted you!',
    liked: '{{senderName}} liked you!',
    favorite: '{{senderName}} favorite you!',
    replied: '{{senderName}} replied you!',
    commented: '{{senderName}} commented you!',
    expired: '{{senderName}} report for your resource link has expired!',
    merged: 'Your update request has been merged by the {{senderName}}!',
    declined: 'Your update request declined by the {{senderName}}!',
    admin: 'System message',
    mentioned: '{{senderName}} mentioned you!',
    default: '{{senderName}} {{action}} you!'
  }
}

const getMessageContent = (locale: Locale, message: Message): string => {
  const template =
    messageTemplates[locale][message.type] || messageTemplates[locale].default
  return template.replace('{{senderName}}', message.senderName)
}

export const getMessageI18n = (locale: Locale, message: Message) => {
  if (message.type === 'admin') {
    return messageTemplates[locale === 'zh-cn' ? 'zh' : 'en'].admin
  }

  return getMessageContent(locale, message)
}
