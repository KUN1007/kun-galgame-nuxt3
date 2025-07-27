<script setup lang="ts">
const props = defineProps<{
  galgameId: number
  targetUserId: number
  likeCount: number
  isLiked: boolean
}>()

const { id } = usePersistUserStore()
const isLiked = ref(id && props.isLiked)
const likesCount = ref(props.likeCount)

const toggleLikeGalgame = async () => {
  const result = await $fetch(`/api/galgame/${props.galgameId}/like`, {
    method: 'PUT',
    watch: false,
    body: { galgameId: props.galgameId },
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
  if (!id) {
    useMessage(10532, 'warn', 5000)
    return
  }
  if (id === props.targetUserId) {
    useMessage(10533, 'warn')
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <KunTooltip text="点赞">
    <KunButton
      :is-icon-only="true"
      :variant="isLiked ? 'flat' : 'light'"
      :color="isLiked ? 'secondary' : 'default'"
      :size="likesCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickLike"
    >
      <KunIcon name="lucide:thumbs-up" />
      <span v-if="likesCount">{{ likesCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
