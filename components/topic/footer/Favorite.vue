<script setup lang="ts">
const props = defineProps<{
  tid: number
  favorites: number[]
  toUid: number
}>()

const { moemoeAccessToken, uid } = useKUNGalgameUserStore()
const isFavorite = ref(props.favorites.includes(uid))
const favoritesCount = ref(props.favorites.length)

watch(
  () => props.favorites,
  (newFavorites) => {
    isFavorite.value = newFavorites.includes(uid)
    favoritesCount.value = newFavorites.length
  }
)

const throttleCallback = () => {
  useMessage(
    'You can only perform one operation within 1007 milliseconds',
    '您在 1007 毫秒内只能进行一次操作',
    'warn'
  )
}

const favoriteOperation = async (
  tid: number,
  toUid: number,
  isPush: boolean
) => {
  const queryData = {
    isPush,
    to_uid: toUid
  }
  const { data } = await useFetch(`/api/topic/${tid}/favorite`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    ...kungalgameResponseHandler
  })
  return data
}

const toggleFavorite = async () => {
  const { tid, toUid } = props
  const isPush = !isFavorite.value

  const data = await favoriteOperation(tid, toUid, isPush)

  if (data.value) {
    isFavorite.value = isPush
    favoritesCount.value += isPush ? 1 : -1

    if (isPush) {
      useMessage('Favorite successfully!', '收藏成功！', 'success')

      const socket = useSocket()
      socket.emit('favorite', props.toUid)
    } else {
      useMessage('Cancel favorite successfully!', '取消收藏成功！', 'success')
    }
  }
}

const handleClickFavoriteThrottled = throttle(
  toggleFavorite,
  1007,
  throttleCallback
)

const handleClickLike = () => {
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
  <li>
    <span
      class="like"
      :class="isFavorite ? 'active' : ''"
      @click="handleClickLike"
    >
      <Icon class="icon" name="lucide:heart" />
    </span>
    <span v-if="favoritesCount">{{ favoritesCount }}</span>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 17px;
  margin-right: 0;

  span {
    display: flex;
    margin-right: 3px;
  }
}

.like {
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .like {
    font-size: initial;
  }
}
</style>
