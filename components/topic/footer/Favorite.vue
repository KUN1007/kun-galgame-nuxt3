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
      useMessage('Favorite successfully!', '收藏成功！', 'success')
    } else {
      useMessage('Cancel favorite successfully!', '取消收藏成功！', 'success')
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  color: var(--kungalgame-font-color-2);

  .icon {
    cursor: pointer;
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .favorite {
    .icon {
      font-size: initial;
    }
  }
}
</style>
