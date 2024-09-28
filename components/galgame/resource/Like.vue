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
    useMessage(10539, 'warn')
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
    useMessage(10530, 'success')
  }
}

const handleClickLike = async () => {
  if (!moemoeAccessToken) {
    useMessage(10532, 'warn', 5000)
    return
  }
  await likeResource()
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

  .icon {
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
