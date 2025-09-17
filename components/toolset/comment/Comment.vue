<script setup lang="ts">
import type { ToolsetComment } from '~/types/api/toolset-comment'

const props = defineProps<{
  comment: ToolsetComment
  ownerId: number
}>()
const emits = defineEmits<{
  remove: [id: number]
  replied: []
  updated: [id: number, content: string, edited: string]
}>()

const { id: myUid, role } = usePersistUserStore()

const isShowReply = ref(false)
const isEditing = ref(false)
const editContent = ref('')

const canDelete = computed(
  () => props.comment.user.id === myUid || props.ownerId === myUid || role >= 2
)
const canEdit = computed(() => props.comment.user.id === myUid)

const handleDelete = async () => {
  const res = await useComponentMessageStore().alert('确认删除该评论？')
  if (!res) return
  const ok = await $fetch(`/api/toolset/${props.comment.toolsetId}/comment`, {
    method: 'DELETE',
    query: { commentId: props.comment.id },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (ok) {
    useMessage(10538, 'success')
    emits('remove', props.comment.id)
  }
}

const startEdit = () => {
  isEditing.value = true
  editContent.value = props.comment.content
}
const cancelEdit = () => {
  isEditing.value = false
  editContent.value = ''
}
const saveEdit = async () => {
  if (!editContent.value.trim()) {
    useMessage(10540, 'warn')
    return
  }
  const ok = await $fetch(`/api/toolset/${props.comment.toolsetId}/comment`, {
    method: 'PUT',
    body: { commentId: props.comment.id, content: editContent.value },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (ok) {
    emits(
      'updated',
      props.comment.id,
      editContent.value,
      new Date().toISOString()
    )
    useMessage('已更新评论', 'success')
    cancelEdit()
  }
}

const onReplied = () => {
  isShowReply.value = false
  emits('replied')
}
</script>

<template>
  <KunCard :is-hoverable="false" content-class="flex-row gap-3">
    <KunAvatar :user="comment.user" />

    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-wrap items-center">
        <span class="text-default-700">{{ comment.user.name }}</span>
        <div v-if="comment.targetUser">
          <span class="mx-2">=></span>
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
        <KunTextarea v-model="editContent" :rows="3" />
        <div class="flex justify-end gap-1">
          <KunButton variant="light" color="danger" @click="cancelEdit">
            取消
          </KunButton>
          <KunButton @click="saveEdit">保存</KunButton>
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

          <KunTooltip text="编辑">
            <KunButton
              :is-icon-only="true"
              v-if="canEdit"
              variant="light"
              size="lg"
              class-name="gap-1"
              @click="startEdit"
            >
              <KunIcon name="lucide:edit-3" />
            </KunButton>
          </KunTooltip>

          <KunTooltip text="删除">
            <KunButton
              :is-icon-only="true"
              v-if="canDelete"
              variant="light"
              color="danger"
              size="lg"
              class-name="gap-1"
              @click="handleDelete"
            >
              <KunIcon name="lucide:trash-2" />
            </KunButton>
          </KunTooltip>
        </div>
      </div>

      <KunAnimationFadeCard>
        <div v-if="isShowReply" class="mt-2">
          <ToolsetCommentPublish
            :toolset-id="comment.toolsetId"
            :parent-id="comment.id"
            @set-new-comment="onReplied"
          />
        </div>
      </KunAnimationFadeCard>
    </div>
  </KunCard>
</template>
