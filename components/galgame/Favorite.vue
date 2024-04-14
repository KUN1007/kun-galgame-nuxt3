<script setup lang="ts">
const props = defineProps<{
  gid: number
  toUid: number
  favoritesCount: number
  isFavorite: boolean
}>()

const { moemoeAccessToken } = usePersistUserStore()
const isFavorite = ref(props.isFavorite)
const favoritesCount = ref(props.favoritesCount)

const toggleFavoriteGalgame = async () => {
  const { data } = await useFetch(`/api/galgame/${props.gid}/favorite`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    favoritesCount.value += isFavorite.value ? -1 : 1

    if (!isFavorite.value) {
      useMessage('Favorite successfully!', '收藏成功！', 'success')

      const socket = useSocket()
      socket.emit('like', props.toUid)
    } else {
      useMessage('CancelUn favorite successfully!', '取消收藏成功！', 'success')
    }

    isFavorite.value = !isFavorite.value
  }
}

const handleClickFavoriteThrottled = throttle(toggleFavoriteGalgame, 1007, () =>
  useMessage(
    'You can only perform one operation within 1007 milliseconds',
    '您在 1007 毫秒内只能进行一次操作',
    'warn'
  )
)

const handleClickFavorite = () => {
  if (!moemoeAccessToken) {
    useMessage(
      'You need to login to favorite',
      '您需要登录以收藏',
      'warn',
      5000
    )
    return
  }
  handleClickFavoriteThrottled()
}
</script>

<template>
  <span
    class="favorite"
    :class="isFavorite ? 'active' : ''"
    @click="handleClickFavorite"
  >
    <Icon class="icon" name="lucide:heart" />
    <span v-if="favoritesCount">{{ favoritesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.favorite {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;

  .icon {
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
