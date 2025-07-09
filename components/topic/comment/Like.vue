<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  comment: TopicComment
}>()

const { id } = usePersistUserStore()
const isLiked = ref(props.comment.isLiked)
const likeCount = ref(props.comment.likeCount)

const likeComment = async () => {
  if (isLiked.value) {
    useMessage(10217, 'warn')
    return
  }

  if (id === props.comment.user.id) {
    useMessage(10218, 'warn')
    return
  }

  const result = await $fetch(`/api/topic/${props.comment.id}/comment/like`, {
    method: 'PUT',
    query: { commentId: props.comment.id },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likeCount.value++
    isLiked.value = true
    useMessage(10219, 'success')
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
