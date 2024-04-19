<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  comment: TopicComment
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

  const result = await $fetch(`/api/topic/${props.comment.tid}/comment/like`, {
    method: 'PUT',
    query: { cid: props.comment.cid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
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
.like {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  .icon {
    cursor: pointer;
    color: var(--kungalgame-font-color-2);
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
