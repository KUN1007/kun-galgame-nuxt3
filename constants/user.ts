import type { KunTabItem } from '~/components/kun/tab/type'

type _NavItemData = { text: string; path: string }

export const TOPIC_NAV_CONFIG: Record<
  (typeof KUN_USER_PAGE_TOPIC_TYPE)[number],
  _NavItemData
> = {
  topic: { text: '已发布', path: 'topic' },
  topic_like: { text: '已点赞', path: 'topic-like' },
  topic_upvote: { text: '已推', path: 'topic-upvote' },
  topic_favorite: { text: '已收藏', path: 'topic-favorite' },
  topic_hide: { text: '已隐藏', path: 'topic-hide' }
}

export const REPLY_NAV_CONFIG: Record<
  (typeof KUN_USER_PAGE_REPLY_TYPE)[number],
  _NavItemData
> = {
  reply_created: { text: '已发布', path: 'reply-created' },
  reply_target: { text: '被回复', path: 'reply-target' },
  reply_like: { text: '已点赞', path: 'reply-like' }
}

export const COMMENT_NAV_CONFIG: Record<
  (typeof KUN_USER_PAGE_COMMENT_TYPE)[number],
  _NavItemData
> = {
  comment_created: { text: '已发布', path: 'comment-created' },
  comment_target: { text: '被评论', path: 'comment-target' },
  comment_like: { text: '已点赞', path: 'comment-like' }
}

export const GALGAME_NAV_CONFIG: Record<
  (typeof KUN_USER_PAGE_GALGAME_TYPE)[number],
  _NavItemData
> = {
  galgame: { text: '已发布', path: 'galgame' },
  galgame_like: { text: '已点赞', path: 'galgame-like' },
  galgame_favorite: { text: '已收藏', path: 'galgame-favorite' },
  galgame_contribute: { text: '已贡献', path: 'galgame-contribute' },
  galgame_pr: { text: '更新请求', path: 'galgame-pr' },
  galgame_history: { text: '贡献历史', path: 'galgame-history' },
  galgame_link: { text: '相关链接', path: 'galgame-link' },
  galgame_comment: { text: '评论', path: 'galgame-comment' },
  galgame_comment_target: { text: '被评论', path: 'galgame-comment-target' },
  galgame_comment_like: { text: '点赞评论', path: 'galgame-comment-like' }
}

export const GALGAME_RESOURCE_NAV_CONFIG: Record<
  (typeof KUN_USER_PAGE_GALGAME_RESOURCE_TYPE)[number],
  _NavItemData
> = {
  valid: { text: '有效资源', path: 'valid' },
  expire: { text: '过期资源', path: 'expire' },
  galgame_resource_like: { text: '点赞资源', path: 'galgame-resource-like' }
}

const createUserPageNavItems = <T extends string>(
  uid: number,
  basePath: string,
  typesArray: readonly T[],
  config: Record<T, _NavItemData>
): KunTabItem[] => {
  return typesArray.map((value) => ({
    value,
    textValue: config[value].text,
    href: `/user/${uid}/${basePath}/${config[value].path}`
  }))
}

export const kunUserTopicNavItem = (uid: number): KunTabItem[] => {
  return createUserPageNavItems(
    uid,
    'topic',
    KUN_USER_PAGE_TOPIC_TYPE,
    TOPIC_NAV_CONFIG
  )
}

export const kunUserReplyNavItem = (uid: number): KunTabItem[] => {
  return createUserPageNavItems(
    uid,
    'reply',
    KUN_USER_PAGE_REPLY_TYPE,
    REPLY_NAV_CONFIG
  )
}

export const kunUserCommentNavItem = (uid: number): KunTabItem[] => {
  return createUserPageNavItems(
    uid,
    'comment',
    KUN_USER_PAGE_COMMENT_TYPE,
    COMMENT_NAV_CONFIG
  )
}

export const kunUserGalgameNavItem = (uid: number): KunTabItem[] => {
  return createUserPageNavItems(
    uid,
    'galgame',
    KUN_USER_PAGE_GALGAME_TYPE,
    GALGAME_NAV_CONFIG
  )
}

export const kunUserGalgameResourceNavItem = (uid: number): KunTabItem[] => {
  return createUserPageNavItems(
    uid,
    'resource',
    KUN_USER_PAGE_GALGAME_RESOURCE_TYPE,
    GALGAME_RESOURCE_NAV_CONFIG
  )
}

export const KUN_USER_PAGE_TOPIC_TYPE = [
  'topic',
  'topic_like',
  'topic_upvote',
  'topic_favorite',
  'topic_hide'
] as const

export const KUN_USER_PAGE_REPLY_TYPE = [
  'reply_created',
  'reply_target',
  'reply_like'
] as const

export const KUN_USER_PAGE_COMMENT_TYPE = [
  'comment_created',
  'comment_target',
  'comment_like'
] as const

export const KUN_USER_PAGE_GALGAME_TYPE = [
  'galgame',
  'galgame_like',
  'galgame_favorite',
  'galgame_contribute',
  'galgame_pr',
  'galgame_history',
  'galgame_link',
  'galgame_comment',
  'galgame_comment_target',
  'galgame_comment_like'
] as const

export const KUN_USER_PAGE_GALGAME_RESOURCE_TYPE = [
  'valid',
  'expire',
  'galgame_resource_like'
] as const

export const KUN_USER_PAGE_NAV_MAP: Record<string, string> = {
  profile: '个人信息',
  setting: '信息设置',
  email: '邮箱设置',
  password: '密码设置',
  topic: '话题',
  galgame: 'Galgame',
  rating: 'Gal 评分',
  resource: 'Gal 资源',
  publish: '已发布',
  like: '已点赞',
  favorite: '已收藏',
  upvote: '已推',
  contribute: '已贡献',
  reply: '回复',
  comment: '评论'
}

export const KUN_USER_ROLE_MAP: Record<number, string> = {
  1: '用户',
  2: '管理员',
  3: '超级管理员'
}

export const KUN_USER_STATUS_MAP: Record<number, string> = {
  0: '正常',
  1: '封禁'
}
