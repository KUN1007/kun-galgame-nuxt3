export const KUN_ACTIVITY_TYPE_TYPE: Record<string, string> = {
  GALGAME_CREATION: 'Galgame',
  TOPIC_CREATION: '话题',
  MESSAGE_UPVOTE: '话题被推',
  MESSAGE_SOLUTION: '最佳解答',
  TOPIC_REPLY_CREATION: '话题回复',
  TOPIC_COMMENT_CREATION: '话题评论',
  GALGAME_WEBSITE_CREATION: 'Galgame 网站',
  GALGAME_RESOURCE_CREATION: 'Galgame 资源',
  GALGAME_COMMENT_CREATION: 'Galgame 评论',
  GALGAME_PR_CREATION: 'Galgame 更新请求',
  GALGAME_WEBSITE_COMMENT_CREATION: 'Galgame 网站评论',
  TODO_CREATION: '待办',
  UPDATE_LOG_CREATION: '更新日志',
  TOOLSET_COMMENT_CREATION: '工具集评论'
}

export const KUN_ALLOWED_ACTIVITY_TYPE = [
  'GALGAME_CREATION',
  'GALGAME_COMMENT_CREATION',
  'GALGAME_PR_CREATION',
  'GALGAME_WEBSITE_CREATION',
  'GALGAME_WEBSITE_COMMENT_CREATION',
  'GALGAME_RESOURCE_CREATION',
  'TOOLSET_COMMENT_CREATION',
  'TOPIC_CREATION',
  'TOPIC_REPLY_CREATION',
  'TOPIC_COMMENT_CREATION',
  'TODO_CREATION',
  'UPDATE_LOG_CREATION',
  'MESSAGE_UPVOTE',
  'MESSAGE_SOLUTION'
] as const

export const KUN_ACTIVITY_ICON_MAP: Record<string, string> = {
  GALGAME_CREATION: 'lucide:gamepad-2',
  GALGAME_COMMENT_CREATION: 'lucide:message-square',
  GALGAME_PR_CREATION: 'lucide:git-pull-request-arrow',
  GALGAME_WEBSITE_CREATION: 'lucide:globe',
  GALGAME_WEBSITE_COMMENT_CREATION: 'lucide:message-square-text',
  GALGAME_RESOURCE_CREATION: 'lucide:box',
  TOOLSET_COMMENT_CREATION: 'lucide:wrench',
  TOPIC_CREATION: 'icon-park-outline:topic',
  TOPIC_REPLY_CREATION: 'carbon:reply',
  TOPIC_COMMENT_CREATION: 'lucide:message-circle-more',
  TODO_CREATION: 'lucide:list-checks',
  UPDATE_LOG_CREATION: 'lucide:file-clock',
  MESSAGE_UPVOTE: 'lucide:sparkles',
  MESSAGE_SOLUTION: 'lucide:bookmark-check'
}
