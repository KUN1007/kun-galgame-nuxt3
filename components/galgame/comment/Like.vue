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
    useMessage(`You've already liked it`, '您已经点过赞了', 'warn')
    return
  }

  if (uid === props.comment.user.uid) {
    useMessage('You cannot like yourself', '您不可以给自己点赞', 'warn')
    return
  }

  const { data } = await useFetch(
    `/api/galgame/${props.comment.gid}/comment/like`,
    {
      method: 'PUT',
      query: { gcid: props.comment.gcid },
      watch: false,
      ...kungalgameResponseHandler
    }
  )

  if (data.value) {
    likesCount.value++
    isLiked.value = true
    useMessage('Like successfully!', '点赞成功', 'success')
  }
}

const handleClickLike = async () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to like', '您需要登录以点赞', 'warn', 5000)
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
