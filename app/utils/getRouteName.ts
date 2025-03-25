export const useRouteName = () => {
  const route = useRoute()

  const routeName = computed(() =>
    (route.name as string).replace(/___[a-z]{2}-[a-z]{2}$/, '')
  )
  return routeName
}
