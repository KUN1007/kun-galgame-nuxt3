<script setup lang="ts">
import type { GalgameRatingComment } from '~/types/api/galgame-rating'

const props = defineProps<{
  ratingId: number
  ratingAuthorId: number
  comment: GalgameRatingComment
}>()

const emits = defineEmits<{
  onCreateSuccess: [GalgameRatingComment]
  onEditSuccess: [GalgameRatingComment]
  onDeleteSuccess: [commentId: number]
}>()

const { id, role } = usePersistUserStore()

const isShowReply = ref(false)
const isEditing = ref(false)
const editingContent = ref('')

const canDelete = computed(() => props.comment.user.id === id || role >= 2)
const canEdit = computed(() => props.comment.user.id === id)

const startEdit = () => {
  isEditing.value = true
  editingContent.value = props.comment.content
}
const cancelEdit = () => {
  isEditing.value = false
  editingContent.value = ''
}

const submitEdit = async () => {
  const text = editingContent.value.trim()
  if (!text) {
    useMessage('请输入评论内容', 'warn')
    return
  }
  const res = await $fetch(`/api/galgame-rating/${props.ratingId}/comment`, {
    method: 'PUT',
    body: {
      galgameRatingCommentId: props.comment.id,
      content: text
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (res) {
    useMessage('更新成功', 'success')
    cancelEdit()
    emits('onEditSuccess', res)
  }
}

const deleteComment = async () => {
  const ok = await useComponentMessageStore().alert(
    '确认删除该评论？',
    '该操作不可恢复'
  )
  if (!ok) return
  const res = await $fetch(`/api/galgame-rating/${props.ratingId}/comment`, {
    method: 'DELETE',
    query: { galgameRatingCommentId: props.comment.id },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (res) {
    useMessage('删除成功', 'success')
    emits('onDeleteSuccess', props.comment.id)
  }
}

const handleCreateSuccess = (newComment: GalgameRatingComment) => {
  emits('onCreateSuccess', newComment)
  cancelEdit()
  isShowReply.value = false
}
</script>

<template>
  <KunCard :is-hoverable="false" content-class="flex-row gap-3">
    <KunAvatar :user="comment.user" />

    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-wrap items-center">
        <span class="text-default-700">{{ comment.user.name }}</span>
        <div class="ml-1" v-if="comment.targetUser">
          =>
          <KunLink
            underline="hover"
            :to="`/user/${comment.targetUser.id}/info`"
          >
            {{ `${comment.targetUser.name}` }}
          </KunLink>
        </div>
      </div>

      <div v-if="!isEditing" class="break-all whitespace-pre-line">
        {{ comment.content }}
      </div>
      <div v-else class="space-y-2">
        <KunTextarea v-model="editingContent" auto-grow />
        <div class="flex gap-2">
          <KunButton size="sm" @click="submitEdit">保存</KunButton>
          <KunButton
            size="sm"
            variant="light"
            color="default"
            @click="cancelEdit"
          >
            取消
          </KunButton>
        </div>
      </div>

      <div class="flex items-end justify-between">
        <span class="text-default-500 text-sm">
          发布于 {{ formatTimeDifference(comment.created) }}
        </span>

        <div class="flex items-center justify-end gap-1">
          <KunButton
            variant="flat"
            class-name="gap-1"
            @click="isShowReply = !isShowReply"
          >
            回复
          </KunButton>

          <KunTooltip text="删除">
            <KunButton
              :is-icon-only="true"
              v-if="canDelete"
              variant="light"
              color="danger"
              size="lg"
              class-name="gap-1"
              @click="deleteComment"
            >
              <KunIcon name="lucide:trash-2" />
            </KunButton>
          </KunTooltip>

          <KunTooltip text="编辑">
            <KunButton
              :is-icon-only="true"
              v-if="canEdit"
              variant="light"
              color="default"
              size="lg"
              class-name="gap-1"
              @click="startEdit"
            >
              <KunIcon name="lucide:pencil" />
            </KunButton>
          </KunTooltip>
        </div>
      </div>

      <KunAnimationFadeCard>
        <GalgameRatingCommentPanel
          v-if="isShowReply"
          :rating-id="ratingId"
          :target-user-id="comment.user.id"
          @close="isShowReply = false"
          @on-success="handleCreateSuccess"
        />
      </KunAnimationFadeCard>
    </div>
  </KunCard>
</template>
