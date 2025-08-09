import { KUN_FORUM_DISABLE_REGISTER_KEY } from '~/config/admin'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }
  if (userInfo.role < 3) {
    return kunError(event, '您没有权限更改网站呢注册状态')
  }

  const res = await useStorage('redis').getItem(KUN_FORUM_DISABLE_REGISTER_KEY)

  if (res) {
    await useStorage('redis').del(KUN_FORUM_DISABLE_REGISTER_KEY)
  } else {
    await useStorage('redis').setItem(KUN_FORUM_DISABLE_REGISTER_KEY, 'true')
  }

  return 'Moemoe update website register status successfully!'
})
