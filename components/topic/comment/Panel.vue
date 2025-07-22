<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  replyId: number
  targetUser: KunUser
}>()

const emits = defineEmits<{
  getComment: [newComment: TopicComment]
  closePanel: []
}>()

const { name } = usePersistUserStore()
const topicId = inject<number>('topicId')
const commentValue = ref('')
const isPublishing = ref(false)

const handlePublishComment = async () => {
  if (!commentValue.value.trim()) {
    useMessage(10221, 'warn')
    return
  }

  if (commentValue.value.trim().length > 1007) {
    useMessage(10222, 'warn')
    return
  }

  isPublishing.value = true
  const comment = await $fetch(`/api/topic/${topicId}/comment`, {
    method: 'POST',
    body: {
      topicId: topicId,
      replyId: props.replyId,
      targetUserId: props.targetUser.id,
      content: commentValue.value
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (comment) {
    emits('getComment', comment)
    useMessage(10224, 'success')
    emits('closePanel')
  }
}

const handleClose = () => {
  emits('closePanel')
}
</script>

<template>
  <div class="w-full space-y-3 pt-2">
    <div class="flex items-center gap-1">
      {{ `${name} 评论` }}
      <KunUser size="sm" :user="targetUser" />
    </div>

    <KunTextarea
      name="comment"
      placeholder="请输入您的评论, 最大字数为1007"
      :rows="5"
      v-model="commentValue"
    />

    <div class="flex w-full justify-end space-x-1">
      <KunButton variant="light" color="danger" @click="handleClose">
        关闭
      </KunButton>
      <KunButton
        :disabled="isPublishing"
        :loading="isPublishing"
        @click="handlePublishComment"
      >
        发布评论
      </KunButton>
    </div>
  </div>
</template>
