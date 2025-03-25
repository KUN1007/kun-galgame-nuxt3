<script setup lang="ts">
const props = defineProps<{
  gid: number
  grid: number
  toUid: number

  likes: number[]
}>()

const { uid } = usePersistUserStore()
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
  if (!uid) {
    useMessage(10532, 'warn', 5000)
    return
  }
  await likeResource()
}
</script>

<template>
  <KunTooltip text="点赞">
    <KunButton
      :is-icon-only="true"
      :variant="isLiked ? 'flat' : 'light'"
      :color="isLiked ? 'secondary' : 'default'"
      :size="likesCount ? 'sm' : 'md'"
      class-name="gap-1"
      @click="handleClickLike"
    >
      <KunIcon name="lucide:thumbs-up" />
      <span v-if="likesCount">{{ likesCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
