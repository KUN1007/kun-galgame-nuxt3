<script setup lang="ts">
import type { GalgameComment } from '~/types/api/galgame-comment'
import type { SerializeObject } from 'nitropack'

const props = defineProps<{
  comment: SerializeObject<GalgameComment>
}>()

const { id } = usePersistUserStore()
const isLiked = ref(id && props.comment.isLiked)
const likesCount = ref(props.comment.likeCount)

const likeComment = async () => {
  if (isLiked.value) {
    useMessage(10539, 'warn')
    return
  }

  if (id === props.comment.user.id) {
    useMessage(10533, 'warn')
    return
  }

  const result = await $fetch(
    `/api/galgame/${props.comment.galgameId}/comment/like`,
    {
      method: 'PUT',
      body: { galgameCommentId: props.comment.id },
      watch: false,
      ...kungalgameResponseHandler
    }
  )

  if (result) {
    likesCount.value++
    isLiked.value = true
    useMessage(10530, 'success')
  }
}

const handleClickLike = async () => {
  if (!id) {
    useMessage(10532, 'warn', 5000)
    return
  }
  await likeComment()
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
