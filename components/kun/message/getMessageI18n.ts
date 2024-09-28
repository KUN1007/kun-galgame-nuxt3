import type { Message } from '~/types/api/message'

const messageTemplates: Record<string, Record<string, string>> = {
  'en-us': {
    upvoted: '{{senderName}} upvoted you!',
    liked: '{{senderName}} liked you!',
    favorite: '{{senderName}} favorite you!',
    replied: '{{senderName}} replied you!',
    commented: '{{senderName}} commented you!',
    expired: '{{senderName}} report for your resource link has expired!',
    requested: '{{senderName}} has requested an update from you!',
    merged: 'Your update request has been merged by the {{senderName}}!',
    declined: 'Your update request declined by the {{senderName}}!',
    admin: 'System message',
    mentioned: '{{senderName}} mentioned you!',
    default: '{{senderName}} {{action}} you!'
  },
  'ja-jp': {
    upvoted: '{{senderName}} があなたを推しました！',
    liked: '{{senderName}} があなたに「いいね！」をしました！',
    favorite: '{{senderName}} があなたをお気に入りに追加しました！',
    replied: '{{senderName}} があなたに返信しました！',
    commented: '{{senderName}} があなたにコメントしました！',
    expired:
      '{{senderName}} があなたのリソースリンクの期限切れを報告しました！',
    requested: '{{senderName}} があなたに更新リクエストを送信しました！',
    merged:
      'あなたの更新リクエストが {{senderName}} によってマージされました！',
    declined:
      'あなたの更新リクエストが {{senderName}} によって拒否されました！',
    admin: 'システムメッセージ',
    mentioned: '{{senderName}} があなたをメンションしました！'
  },
  'zh-cn': {
    upvoted: '{{senderName}} 推了您!',
    liked: '{{senderName}} 点赞了您!',
    favorite: '{{senderName}} 收藏了您!',
    replied: '{{senderName}} 回复了您!',
    commented: '{{senderName}} 评论了您!',
    expired: '{{senderName}} 报告了您的资源链接已过期！',
    requested: '{{senderName}} 向您提出更新请求！',
    merged: '您的更新请求已被 {{senderName}} 合并！',
    declined: '您的更新请求被 {{senderName}} 拒绝！',
    admin: '系统消息',
    mentioned: '{{senderName}} 提到了您！'
  },
  'zh-tw': {
    upvoted: '{{senderName}} 推了您!',
    liked: '{{senderName}} 點贊了您!',
    favorite: '{{senderName}} 收藏了您!',
    replied: '{{senderName}} 回復了您!',
    commented: '{{senderName}} 評論了您!',
    expired: '{{senderName}} 報告了您的資源鏈接已過期！',
    requested: '{{senderName}} 嚮您提出更新請求！',
    merged: '您的更新請求已被 {{senderName}} 合併！',
    declined: '您的更新請求被 {{senderName}} 拒絕！',
    admin: '繫統消息',
    mentioned: '{{senderName}} 提到了您！'
  }
}

const getMessageContent = (locale: Language, message: Message): string => {
  const template =
    messageTemplates[locale][message.type] || messageTemplates[locale].default
  return template.replace('{{senderName}}', message.senderName)
}

export const getMessageI18n = (locale: Language, message: Message) => {
  if (message.type === 'admin') {
    return messageTemplates[locale].admin
  }

  return getMessageContent(locale, message)
}
