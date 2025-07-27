<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  comment: TopicComment
}>()

const { id } = usePersistUserStore()
const isLiked = ref(id && props.comment.isLiked)
const likeCount = ref(props.comment.likeCount)

const likeComment = async () => {
  if (id === props.comment.user.id) {
    useMessage(10218, 'warn')
    return
  }

  const result = await $fetch(`/api/topic/${props.comment.id}/comment/like`, {
    method: 'PUT',
    body: { commentId: props.comment.id },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likeCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage('点赞评论成功', 'success')
    } else {
      useMessage('取消点赞成功', 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLike = async () => {
  if (!id) {
    useMessage(10220, 'warn', 5000)
    return
  }
  await likeComment()
}
</script>

<template>
  <KunButton
    :is-icon-only="true"
    :variant="isLiked ? 'flat' : 'light'"
    :color="isLiked ? 'secondary' : 'default'"
    :size="likeCount ? 'sm' : 'md'"
    class-name="gap-1"
    @click="handleClickLike"
  >
    <KunIcon class="icon" name="lucide:thumbs-up" />
    <span v-if="likeCount">{{ likeCount }}</span>
  </KunButton>
</template>
