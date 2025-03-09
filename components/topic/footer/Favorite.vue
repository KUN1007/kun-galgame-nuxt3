<script setup lang="ts">
const props = defineProps<{
  tid: number
  toUid: number
  favoritesCount: number
  isFavorite: boolean
}>()

const { moemoeAccessToken } = usePersistUserStore()
const isFavorite = ref(props.isFavorite)
const favoritesCount = ref(props.favoritesCount)

const toggleFavoriteGalgame = async () => {
  const result = await $fetch(`/api/topic/${props.tid}/favorite`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    favoritesCount.value += isFavorite.value ? -1 : 1

    if (!isFavorite.value) {
      useMessage(10230, 'success')
    } else {
      useMessage(10231, 'success')
    }

    isFavorite.value = !isFavorite.value
  }
}

const handleClickFavoriteThrottled = throttle(toggleFavoriteGalgame, 1007, () =>
  useMessage(10227, 'warn')
)

const handleClickFavorite = () => {
  if (!moemoeAccessToken) {
    useMessage(10232, 'warn', 5000)
    return
  }
  handleClickFavoriteThrottled()
}
</script>

<template>
  <KunButton
    :is-icon-only="true"
    :variant="isFavorite ? 'flat' : 'light'"
    :color="isFavorite ? 'secondary' : 'default'"
    :size="favoritesCount ? 'md' : 'lg'"
    class-name="gap-1"
    @click="handleClickFavorite"
  >
    <Icon class="icon" name="lucide:heart" />
    <span v-if="favoritesCount">{{ favoritesCount }}</span>
  </KunButton>
</template>
