<script setup lang="ts">
const props = defineProps<{
  topicId?: number
  replyId?: number
  targetUserId: number
  likeCount: number
  isLiked: boolean
}>()

const { id } = usePersistUserStore()
const isLiked = ref(id && props.isLiked)
const likeCount = ref(props.likeCount)

const toggleLike = async () => {
  let res = ''
  if (props.topicId) {
    const result = await $fetch(`/api/topic/${props.topicId}/like`, {
      method: 'PUT',
      watch: false,
      body: { topicId: props.topicId },
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  } else {
    const result = await $fetch(`/api/topic/${props.topicId}/reply/like`, {
      method: 'PUT',
      body: { replyId: props.replyId },
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  }

  if (res) {
    likeCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage(10233, 'success')
    } else {
      useMessage(10234, 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLikeThrottled = throttle(toggleLike, 1007, () =>
  useMessage(10227, 'warn')
)

const handleClickLike = () => {
  if (!id) {
    useMessage(10235, 'warn', 5000)
    return
  }
  if (id === props.targetUserId) {
    useMessage(10236, 'warn')
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
      :size="likeCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickLike"
    >
      <KunIcon name="lucide:thumbs-up" />
      <span v-if="likeCount">{{ likeCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
