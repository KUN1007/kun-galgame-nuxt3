import type { KunTabItem } from '~/components/kun/tab/type'

export const kunUserTopicNavItem = (uid: number): KunTabItem[] => {
  return [
    {
      value: 'publish',
      textValue: '已发布',
      href: `/user/${uid}/topic/publish`
    },
    {
      value: 'like',
      textValue: '已点赞',
      href: `/user/${uid}/topic/like`
    },
    {
      value: 'upvote',
      textValue: '已推',
      href: `/user/${uid}/topic/upvote`
    },
    {
      value: 'favorite',
      textValue: '已收藏',
      href: `/user/${uid}/topic/favorite`
    }
  ]
}

export const KUN_USER_PAGE_NAV_MAP: Record<string, string> = {
  profile: '个人信息',
  setting: '信息设置',
  email: '邮箱设置',
  password: '密码设置',
  topic: '话题',
  galgame: 'Galgame',
  publish: '已发布',
  like: '已点赞',
  favorite: '已收藏',
  upvote: '已推',
  contribute: '已贡献',
  reply: '回复',
  comment: '评论'
}

export const KUN_USER_ROLE_MAP: Record<string, string> = {
  user: '用户',
  admin: '管理员',
  SU: '超级管理员'
}

export const KUN_USER_STATUS_MAP: Record<string, string> = {
  normal: '正常',
  banned: '封禁',
  name: '用户名'
}
