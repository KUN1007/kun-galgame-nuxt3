import type { Message } from '~/types/api/message'

const messageTemplates: Record<string, Record<string, string>> = {
  'en-us': {
    upvoted: ' upvoted you!',
    liked: ' liked you!',
    favorite: ' favorite you!',
    replied: ' replied you!',
    commented: ' commented you!',
    expired: ' report for your resource link has expired!',
    requested: ' has requested an update from you!',
    merged: 'Your update request has been merged by the !',
    declined: 'Your update request declined by the !',
    admin: 'System message',
    mentioned: ' mentioned you!',
    default: ' {{action}} you!'
  },
  'ja-jp': {
    upvoted: ' があなたを推しました！',
    liked: ' があなたに「いいね！」をしました！',
    favorite: ' があなたをお気に入りに追加しました！',
    replied: ' があなたに返信しました！',
    commented: ' があなたにコメントしました！',
    expired: ' があなたのリソースリンクの期限切れを報告しました！',
    requested: ' があなたに更新リクエストを送信しました！',
    merged: 'あなたの更新リクエストが  によってマージされました！',
    declined: 'あなたの更新リクエストが  によって拒否されました！',
    admin: 'システムメッセージ',
    mentioned: ' があなたをメンションしました！'
  },
  'zh-cn': {
    upvoted: ' 推了您!',
    liked: ' 点赞了您!',
    favorite: ' 收藏了您!',
    replied: ' 回复了您!',
    commented: ' 评论了您!',
    expired: ' 报告了您的资源链接已过期！',
    requested: ' 向您提出更新请求！',
    solution: '您的回复被标记为最佳答案!',
    merged: '您的更新请求已被  合并！',
    declined: '您的更新请求被  拒绝！',
    admin: '系统消息',
    mentioned: ' 提到了您！'
  },
  'zh-tw': {
    upvoted: ' 推了您!',
    liked: ' 點贊了您!',
    favorite: ' 收藏了您!',
    replied: ' 回復了您!',
    commented: ' 評論了您!',
    expired: ' 報告了您的資源鏈接已過期！',
    requested: ' 嚮您提出更新請求！',
    merged: '您的更新請求已被  合併！',
    declined: '您的更新請求被  拒絕！',
    admin: '繫統消息',
    mentioned: ' 提到了您！'
  }
}

const getMessageContent = (locale: Language, message: Message): string => {
  const template =
    messageTemplates[locale][message.type] || messageTemplates[locale].default
  return template
}

export const getMessageI18n = (message: Message) => {
  if (message.type === 'admin') {
    return messageTemplates['zh-cn'].admin
  }

  return getMessageContent('zh-cn', message)
}
