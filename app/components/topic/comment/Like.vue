<script setup lang="ts">
import type { TopicComment } from '@/types/api/topic-comment'

const props = defineProps<{
  comment: TopicComment
}>()

const { uid } = usePersistUserStore()
const isLiked = ref(props.comment.likes.isLiked)
const likesCount = ref(props.comment.likes.count)

const likeComment = async () => {
  if (isLiked.value) {
    useMessage(10217, 'warn')
    return
  }

  if (uid === props.comment.user.uid) {
    useMessage(10218, 'warn')
    return
  }

  const result = await $fetch(`/api/topic/${props.comment.tid}/comment/like`, {
    method: 'PUT',
    query: { cid: props.comment.cid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likesCount.value++
    isLiked.value = true
    useMessage(10219, 'success')
  }
}

const handleClickLike = async () => {
  if (!uid) {
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
    :size="likesCount ? 'sm' : 'md'"
    class-name="gap-1"
    @click="handleClickLike"
  >
    <Icon class="icon" name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </KunButton>
</template>
