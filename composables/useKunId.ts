export const useKunUniqueId = (id?: string) => {
  const kunId = ref(id || '')
  onMounted(() => {
    const vueId = useId()
    kunId.value = `${id}${vueId}`
  })
  return kunId
}
