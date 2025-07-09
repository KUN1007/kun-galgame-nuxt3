export default defineNuxtRouteMiddleware((to, from) => {
  const { id } = usePersistUserStore()

  if (!id) {
    useMessage(10249, 'warn', 5000)
    return navigateTo('/login')
  }
})
