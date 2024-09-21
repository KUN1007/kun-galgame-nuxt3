<script setup lang="ts">
import type { SerializeObject } from 'nitropack'
import type { GalgameComment } from '~/types/api/galgame-comment'

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
  <span class="like" :class="isLiked ? 'active' : ''" @click="handleClickLike">
    <Icon class="icon" name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
  color: var(--kungalgame-font-color-2);
  margin-right: 3px;
  margin-bottom: 3px;
}

.active {
  .icon {
    color: var(--kungalgame-red-4);
  }
}
</style>
