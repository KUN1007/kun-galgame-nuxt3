<script setup lang="ts">
const props = defineProps<{
  gid: number
  toUid: number
  favoritesCount: number
  isFavorite: boolean
}>()

const { id } = usePersistUserStore()
const isFavorite = ref(props.isFavorite)
const favoritesCount = ref(props.favoritesCount)

const toggleFavoriteGalgame = async () => {
  const result = await $fetch(`/api/galgame/${props.gid}/favorite`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    favoritesCount.value += isFavorite.value ? -1 : 1

    if (!isFavorite.value) {
      useMessage(10526, 'success')
    } else {
      useMessage(10527, 'success')
    }

    isFavorite.value = !isFavorite.value
  }
}

const handleClickFavoriteThrottled = throttle(toggleFavoriteGalgame, 1007, () =>
  useMessage(10528, 'warn')
)

const handleClickFavorite = () => {
  if (!id) {
    useMessage(10529, 'warn', 5000)
    return
  }
  handleClickFavoriteThrottled()
}
</script>

<template>
  <KunTooltip text="收藏">
    <KunButton
      :is-icon-only="true"
      :variant="isFavorite ? 'flat' : 'light'"
      :color="isFavorite ? 'secondary' : 'default'"
      :size="favoritesCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickFavorite"
    >
      <KunIcon name="lucide:heart" />
      <span v-if="favoritesCount">{{ favoritesCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
