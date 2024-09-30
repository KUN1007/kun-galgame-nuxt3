export default defineNuxtRouteMiddleware((to) => {
  useState('routeParamUid', () => to.params.uid)
})
