export default defineNuxtRouteMiddleware((to, from) => {
  const { moemoeAccessToken } = usePersistUserStore()

  const nuxt = useNuxtApp()

  if (!moemoeAccessToken) {
    useMessage(10249, 'warn', 5000)
    return navigateTo(nuxt.$localePath('/login'))
  }
})
