<script setup lang="ts">
import type { ToolsetComment } from '~/types/api/toolset-comment'

const props = defineProps<{
  toolsetId: number
  parentId?: number | null
}>()

const emits = defineEmits<{
  setNewComment: [comment: ToolsetComment]
}>()

const newCommentContent = ref('')
const isPublishing = ref(false)

const handlePostComment = async () => {
  if (!newCommentContent.value.trim()) {
    useMessage(10540, 'warn')
    return
  }
  if (newCommentContent.value.trim().length > 1007) {
    useMessage(10541, 'warn')
    return
  }

  isPublishing.value = true
  const res = await $fetch(`/api/toolset/${props.toolsetId}/comment`, {
    method: 'POST',
    body: {
      toolsetId: props.toolsetId,
      content: newCommentContent.value,
      parentId: props.parentId || null
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (res) {
    emits('setNewComment', res)
    newCommentContent.value = ''
    useMessage(10542, 'success')
  }
}
</script>

<template>
  <div class="space-y-2">
    <KunTextarea v-model="newCommentContent" :rows="3" />
    <div class="flex justify-end">
      <KunButton
        :loading="isPublishing"
        :disabled="!newCommentContent.trim() || isPublishing"
        @click="handlePostComment"
      >
        发表评论
      </KunButton>
    </div>
  </div>
</template>
