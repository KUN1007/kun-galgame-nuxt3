<script setup lang="ts">
const props = defineProps<{
  gid: number
  grid: number
  toUid: number

  likes: number[]
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isLiked = ref(props.likes.includes(uid))
const likesCount = ref(props.likes.length)

watch(
  () => props.likes,
  (newLikes) => {
    isLiked.value = newLikes.includes(uid)
    likesCount.value = newLikes.length
  }
)

const likeResource = async () => {
  if (isLiked.value) {
    useMessage(`You've already liked it`, '您已经点过赞了', 'warn')
    return
  }

  const result = await $fetch(`/api/galgame/${props.gid}/resource/like`, {
    method: 'PUT',
    query: { grid: props.grid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likesCount.value++
    isLiked.value = true
    useMessage('Like successfully!', '点赞成功', 'success')
  }
}

const handleClickLike = async () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to like', '您需要登录以点赞', 'warn', 5000)
    return
  }
  await likeResource()
}
</script>

<template>
  <span class="like" :class="isLiked ? 'active' : ''" @click="handleClickLike">
    <Icon name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.like {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;

  .icon {
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
