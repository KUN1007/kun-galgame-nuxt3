<script setup lang="ts">
const props = defineProps<{
  galgameId: number
  targetUserId: number
  favoriteCount: number
  isFavorited: boolean
}>()

const { id } = usePersistUserStore()
const isFavorited = ref(id && props.isFavorited)
const favoriteCount = ref(props.favoriteCount)

const toggleFavoriteGalgame = async () => {
  const result = await $fetch(`/api/galgame/${props.galgameId}/favorite`, {
    method: 'PUT',
    watch: false,
    body: { galgameId: props.galgameId },
    ...kungalgameResponseHandler
  })

  if (result) {
    favoriteCount.value += isFavorited.value ? -1 : 1

    if (!isFavorited.value) {
      useMessage(10526, 'success')
    } else {
      useMessage(10527, 'success')
    }

    isFavorited.value = !isFavorited.value
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
      :variant="isFavorited ? 'flat' : 'light'"
      :color="isFavorited ? 'secondary' : 'default'"
      :size="favoriteCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickFavorite"
    >
      <KunIcon name="lucide:heart" />
      <span v-if="favoriteCount">{{ favoriteCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
