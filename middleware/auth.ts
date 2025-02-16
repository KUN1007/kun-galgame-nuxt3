export default defineNuxtRouteMiddleware((to, from) => {
  const { moemoeAccessToken } = usePersistUserStore()

  if (!moemoeAccessToken) {
    useMessage(10249, 'warn', 5000)
    return navigateTo('/login')
  }
})
