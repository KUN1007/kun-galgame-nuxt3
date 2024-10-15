<script setup lang="ts">
const props = defineProps<{
  gid: number
  toUid: number
  likesCount: number
  isLiked: boolean
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isLiked = ref(props.isLiked)
const likesCount = ref(props.likesCount)

const toggleLikeGalgame = async () => {
  const result = await $fetch(`/api/galgame/${props.gid}/like`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likesCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage(10530, 'success')
    } else {
      useMessage(10531, 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLikeThrottled = throttle(toggleLikeGalgame, 1007, () =>
  useMessage(10528, 'warn')
)

const handleClickLike = () => {
  if (!moemoeAccessToken) {
    useMessage(10532, 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage(10533, 'warn')
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <span class="like" :class="isLiked ? 'active' : ''" @click="handleClickLike">
    <Icon class="icon" name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.like {
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
