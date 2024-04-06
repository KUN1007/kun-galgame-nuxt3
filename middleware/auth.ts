export default defineNuxtRouteMiddleware((to, from) => {
  const { moemoeAccessToken } = usePersistUserStore()

  const nuxt = useNuxtApp()

  if (!moemoeAccessToken) {
    useMessage(
      'You need to login to continue your operation',
      '您需要登录以继续操作',
      'warn',
      5000
    )
    return navigateTo(nuxt.$localePath('/login'))
  }
})
