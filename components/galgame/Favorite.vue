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
  if (!moemoeAccessToken) {
    useMessage(10529, 'warn', 5000)
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
  @include kun-center;

  .icon {
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
