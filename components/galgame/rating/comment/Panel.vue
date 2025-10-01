<script setup lang="ts">
import type { GalgameRatingComment } from '~/types/api/galgame-rating'

const props = defineProps<{
  ratingId: number
  targetUserId: number
}>()

const emits = defineEmits<{
  onSuccess: [GalgameRatingComment]
}>()

const content = ref('')
const isPublishing = ref(false)

const handlePublishComment = async () => {
  const text = content.value.trim()
  if (!text) {
    useMessage('请输入评论内容', 'warn')
    return
  }
  if (text.length > 1007) {
    useMessage('内容长度不能超过 1007 字', 'warn')
    return
  }

  isPublishing.value = true
  const result = await $fetch(`/api/galgame-rating/${props.ratingId}/comment`, {
    method: 'POST',
    body: {
      galgameRatingId: props.ratingId,
      targetUserId: props.targetUserId,
      content: text
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    content.value = ''
    useMessage('发布成功', 'success')
    emits('onSuccess', result)
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunTextarea v-model="content" name="comment" :rows="5" />

    <div class="flex items-center justify-end">
      <KunButton
        class="ml-auto"
        @click="handlePublishComment"
        :loading="isPublishing"
      >
        发布
      </KunButton>
    </div>
  </div>
</template>
