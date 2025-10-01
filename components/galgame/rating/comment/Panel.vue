<script setup lang="ts">
const props = defineProps<{
  ratingId: number
  targetUserId: number
}>()

const emits = defineEmits<{
  close: []
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
    emits('close')
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunTextarea
      placeholder="友善发言，最多 1007 字"
      v-model="content"
      name="comment"
      :rows="5"
      auto-grow
    />

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
