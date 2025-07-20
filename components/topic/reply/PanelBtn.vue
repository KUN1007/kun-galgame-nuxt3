<script setup lang="ts">
import { createReplySchema, updateReplySchema } from '~/validations/topic'

const route = useRoute()
const topicId = computed(() => {
  return parseInt((route.params as { id: string }).id)
})

const tempReplyStore = useTempReplyStore()
const { isEdit, isReplyRewriting, replyRewrite } = storeToRefs(tempReplyStore)

const persistReplyStore = usePersistKUNGalgameReplyStore()
const { replyDraft } = storeToRefs(persistReplyStore)

const isPublishing = ref(false)

const handlePublish = async () => {
  if (isPublishing.value) {
    return
  }

  const body = {
    topicId: topicId.value,
    content: replyDraft.value.mainContent || '',
    targets: replyDraft.value.targets.map((t) => ({
      targetReplyId: t.targetReplyId,
      content: t.content || ''
    }))
  }
  const result = createReplySchema.safeParse(body)
  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    return
  }

  const res = await useComponentMessageStore().alert('确认发布吗？')
  if (!res) {
    return
  }

  isPublishing.value = true

  const reply = await $fetch(`/api/topic/${topicId.value}/reply`, {
    method: 'POST',
    body,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (reply) {
    isEdit.value = false
    tempReplyStore.setSuccessfulReply({ data: reply, type: 'created' })
    persistReplyStore.resetReplyDraft()
    useMessage(10243, 'success')
  }
  isPublishing.value = false
}

const handleRewrite = async () => {
  if (isPublishing.value) {
    return
  }

  const body = {
    replyId: replyRewrite.value!.id,
    content: replyRewrite.value!.mainContent || '',
    targets: replyRewrite.value!.targets.map((t) => ({
      targetReplyId: t.targetReplyId,
      content: t.content || ''
    }))
  }
  const result = updateReplySchema.safeParse(body)
  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    return
  }
  const res = await useComponentMessageStore().alert('确定提交编辑吗?')
  if (!res) {
    return
  }

  isPublishing.value = true

  const reply = await $fetch(`/api/topic/${topicId.value}/reply`, {
    method: 'PUT',
    body,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (reply) {
    useMessage(10244, 'success')
    tempReplyStore.setSuccessfulReply({ data: reply, type: 'updated' })
    tempReplyStore.resetRewriteReplyData()
    isEdit.value = false
  }
  isPublishing.value = false
}

const handleCancel = () => {
  isEdit.value = false
  tempReplyStore.resetRewriteReplyData()
}
</script>

<template>
  <div class="flex justify-between gap-1">
    <KunTooltip class-name="flex" text="设置面板帮助" position="bottom">
      <KunLink to="/doc/help/reply-panel-help" size="sm" underline="hover">
        回复面板使用帮助
        <KunIcon name="lucide:circle-help" />
      </KunLink>
    </KunTooltip>

    <div class="space-x-1">
      <KunButton color="danger" variant="light" @click="handleCancel">
        取消
      </KunButton>

      <KunButton
        :loading="isPublishing"
        v-if="!isReplyRewriting"
        @click="handlePublish"
      >
        确认发布
      </KunButton>

      <KunButton
        :loading="isPublishing"
        v-if="isReplyRewriting"
        @click="handleRewrite"
      >
        确定编辑
      </KunButton>
    </div>
  </div>
</template>
