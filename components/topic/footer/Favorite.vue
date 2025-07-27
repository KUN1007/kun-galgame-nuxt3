<script setup lang="ts">
const props = defineProps<{
  topicId: number
  favoriteCount: number
  isFavorite: boolean
}>()

const { id } = usePersistUserStore()
const isFavorite = ref(id && props.isFavorite)
const favoriteCount = ref(props.favoriteCount)

const toggleFavoriteGalgame = async () => {
  const result = await $fetch(`/api/topic/${props.topicId}/favorite`, {
    method: 'PUT',
    watch: false,
    body: { topicId: props.topicId },
    ...kungalgameResponseHandler
  })

  if (result) {
    favoriteCount.value += isFavorite.value ? -1 : 1

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
  if (!id) {
    useMessage(10232, 'warn', 5000)
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
      :size="favoriteCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickFavorite"
    >
      <KunIcon name="lucide:heart" />
      <span v-if="favoriteCount">{{ favoriteCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
