<script setup lang="ts">
import type { GalgameComment } from '~/types/api/galgame-comment'
import type { SerializeObject } from 'nitropack'

const props = defineProps<{
  comment: SerializeObject<GalgameComment>
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isLiked = ref(props.comment.likes.isLiked)
const likesCount = ref(props.comment.likes.count)

const likeComment = async () => {
  if (isLiked.value) {
    useMessage(10539, 'warn')
    return
  }

  if (uid === props.comment.user.uid) {
    useMessage(10533, 'warn')
    return
  }

  const result = await $fetch(
    `/api/galgame/${props.comment.gid}/comment/like`,
    {
      method: 'PUT',
      query: { gcid: props.comment.gcid },
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
  if (!moemoeAccessToken) {
    useMessage(10532, 'warn', 5000)
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
    :size="likesCount ? 'md' : 'lg'"
    class-name="gap-1"
    @click="handleClickLike"
  >
    <Icon name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </KunButton>
</template>
