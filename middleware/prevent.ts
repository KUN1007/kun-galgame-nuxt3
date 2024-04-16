export default defineNuxtRouteMiddleware((_, __) => {
  const type = useRequestURL().searchParams.get('type')
  const { galgamePR } = useTempGalgamePRStore()

  if (type === 'pr' && !galgamePR[0]) {
    return navigateTo('/galgame', { replace: true })
  }
})
