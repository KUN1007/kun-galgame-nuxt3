<script setup lang="ts">
import type { WebsiteComment } from '~/types/api/website'

const props = defineProps<{
  websiteId: number
  receiver?: KunUser | null | undefined
  parentId?: number | null
}>()

const emits = defineEmits<{
  onSuccess: []
  setNewComment: [comment: WebsiteComment]
}>()

const userStore = usePersistUserStore()

const newCommentContent = ref('')
const isPublishing = ref(false)

const handlePostComment = async () => {
  if (!userStore.id) {
    useMessage('请登陆后再发表评论', 'warn')
    return
  }
  if (!newCommentContent.value.trim()) {
    useMessage('评论内容不能为空', 'warn')
    return
  }

  isPublishing.value = true
  const res = await $fetch(`/api/website/${props.websiteId}/comment`, {
    method: 'POST',
    body: {
      websiteId: props.websiteId,
      content: newCommentContent.value,
      parentId: props.parentId
    }
  })

  if (res) {
    emits('setNewComment', res)
    emits('onSuccess')
    newCommentContent.value = ''
    useMessage('发布评论成功', 'success')
  }

  isPublishing.value = false
}
</script>

<template>
  <div class="flex space-x-3">
    <KunAvatar
      :user="{
        id: userStore.id,
        name: userStore.name,
        avatar: userStore.avatar
      }"
      :disable-floating="true"
    />
    <div class="flex-1">
      <KunTextarea v-model="newCommentContent" :rows="3" />
      <div class="mt-3 flex justify-end">
        <KunButton
          @click="handlePostComment"
          :loading="isPublishing"
          :disabled="!newCommentContent.trim() || isPublishing"
        >
          发表评论
        </KunButton>
      </div>
    </div>
  </div>
</template>
