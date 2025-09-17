<script setup lang="ts">
import type { ToolsetComment } from '~/types/api/toolset-comment'

const props = defineProps<{
  comments: ToolsetComment[]
  toolsetId: number
}>()

const emits = defineEmits<{
  setNewComment: [comment: ToolsetComment]
  removeComment: [commentId: number]
}>()

const replyTo = ref<number | null>(null)
const editingId = ref<number | null>(null)
const editingContent = ref('')

const { id, role } = usePersistUserStore()

const handleClickReply = (comment: ToolsetComment) => {
  replyTo.value = replyTo.value === comment.id ? null : comment.id
}

const handleCommitNewComment = (comment: ToolsetComment) => {
  emits('setNewComment', comment)
  replyTo.value = null
}

const handleDeleteComment = async (commentId: number) => {
  const res = await useComponentMessageStore().alert('确认删除该评论？')
  if (!res) return

  const result = await $fetch(`/api/toolset/${props.toolsetId}/comment`, {
    method: 'DELETE',
    query: { commentId },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (result) {
    useMessage(10538, 'success')
    emits('removeComment', commentId)
  }
}

const startEdit = (comment: ToolsetComment) => {
  editingId.value = comment.id
  editingContent.value = comment.content
}

const cancelEdit = () => {
  editingId.value = null
  editingContent.value = ''
}

const handleSaveEdit = async (commentId: number) => {
  if (!editingContent.value.trim()) {
    useMessage(10540, 'warn')
    return
  }
  const result = await $fetch(`/api/toolset/${props.toolsetId}/comment`, {
    method: 'PUT',
    body: { commentId, content: editingContent.value },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (result) {
    useMessage('已更新评论', 'success')
    const updateContent = (list: ToolsetComment[]) => {
      for (const c of list) {
        if (c.id === commentId) {
          c.content = editingContent.value
          c.edited = new Date()
          break
        }
        if (c.reply?.length) updateContent(c.reply)
      }
    }
    updateContent(props.comments)
    cancelEdit()
  }
}

const canManage = (comment: ToolsetComment) =>
  comment.user.id === id || role >= 2
</script>

<template>
  <template v-for="(com, index) in comments" :key="index">
    <KunCard :is-hoverable="false" content-class="flex-row gap-3">
      <KunAvatar :user="com.user" />

      <div class="flex w-full flex-col space-y-2">
        <div class="flex flex-wrap items-center">
          <span class="text-default-700">{{ com.user.name }}</span>
          <div v-if="com.targetUser">
            <span class="mx-2">=></span>
            <KunLink underline="hover" :to="`/user/${com.targetUser.id}/info`">
              {{ `${com.targetUser.name}` }}
            </KunLink>
          </div>
        </div>

        <div v-if="editingId !== com.id" class="break-all whitespace-pre-line">
          {{ com.content }}
        </div>
        <div v-else class="space-y-2">
          <KunTextarea v-model="editingContent" :rows="3" />
          <div class="flex justify-end gap-1">
            <KunButton variant="light" color="danger" @click="cancelEdit">
              取消
            </KunButton>
            <KunButton @click="handleSaveEdit(com.id)">保存</KunButton>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-default-500 text-sm">
            发布于 {{ formatTimeDifference(com.created) }}
          </span>

          <div class="flex items-center justify-end gap-1">
            <KunButton
              variant="flat"
              class-name="gap-1"
              @click="handleClickReply(com)"
            >
              回复
            </KunButton>

            <KunTooltip text="编辑">
              <KunButton
                :is-icon-only="true"
                v-if="canManage(com)"
                variant="light"
                size="lg"
                class-name="gap-1"
                @click="startEdit(com)"
              >
                <KunIcon name="lucide:edit-3" />
              </KunButton>
            </KunTooltip>

            <KunTooltip text="删除">
              <KunButton
                :is-icon-only="true"
                v-if="canManage(com)"
                variant="light"
                color="danger"
                size="lg"
                class-name="gap-1"
                @click="handleDeleteComment(com.id)"
              >
                <KunIcon name="lucide:trash-2" />
              </KunButton>
            </KunTooltip>
          </div>
        </div>

        <KunAnimationFadeCard>
          <div v-if="replyTo === com.id" class="mt-2">
            <ToolsetCommentPublish
              :toolset-id="toolsetId"
              :parent-id="com.id"
              @set-new-comment="handleCommitNewComment"
            />
          </div>
        </KunAnimationFadeCard>

        <ToolsetCommentRender
          v-if="com.reply?.length"
          :comments="com.reply"
          :toolset-id="toolsetId"
          @set-new-comment="emits('setNewComment', $event)"
          @remove-comment="emits('removeComment', $event)"
        />
      </div>
    </KunCard>
  </template>
</template>
