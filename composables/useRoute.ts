export const useRouteName = () => {
  const route = useRoute()

  // Calculate i18n route name
  const routeName = computed(() =>
    route.name.replace(/___[a-z]{2}-[a-z]{2}$/, '')
  )
  return routeName
}

export const useRouteFullPath = () => {
  const route = useRoute()
  const fullPath = computed(() =>
    route.fullPath.replace(/^\/[a-z]{2}-[a-z]{2}\//, '/')
  )
  return fullPath
}
