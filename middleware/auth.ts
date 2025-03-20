export default defineNuxtRouteMiddleware((to, from) => {
  const { uid } = usePersistUserStore()

  if (!uid) {
    useMessage(10249, 'warn', 5000)
    return navigateTo('/login')
  }
})
