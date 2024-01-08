export default defineNuxtRouteMiddleware((to, from) => {
  const { moemoeAccessToken } = useKUNGalgameUserStore()
  if (!moemoeAccessToken) {
    useMessage(
      'You need login to publish topic',
      '您需要登录以发布话题',
      'warn',
      5000
    )
    return navigateTo('/login')
  }
})
