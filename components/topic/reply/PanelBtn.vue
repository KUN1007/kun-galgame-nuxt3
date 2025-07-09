<script setup lang="ts">
import { z } from 'zod'

const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})

const { isEdit, isReplyRewriting, replyRewrite, tempReply } =
  storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())
const isPublishing = ref(false)

const checkCreatePublish = () => {
  const { mainContent, targets } = replyDraft.value
  if (!mainContent?.trim() && targets.length === 0) {
    useMessage('回复内容或回复目标不能为空', 'error')
    return false
  }

  const targetSchema = z.string().min(1, { message: '回复内容不能为空' })
  for (const target of targets) {
    const result = targetSchema.safeParse(target.content)
    if (!result.success) {
      useMessage(
        `对 @${target.targetUserName} 的回复: ${result.error.issues[0].message}`,
        'error'
      )
      return false
    }
  }
  return true
}

const checkMultiReplyPublish = () => {
  if (replyDraft.value.targets.length === 0) {
    useMessage('请至少选择一个回复目标', 'error')
    return false
  }

  const targetSchema = z.string().min(1, { message: '回复内容不能为空' })
  for (const target of replyDraft.value.targets) {
    const result = targetSchema.safeParse(target.content)
    if (!result.success) {
      useMessage(
        `对 @${target.targetUserName} 的回复: ${result.error.issues[0].message}`,
        'error'
      )
      return false
    }
  }
  return true
}

const handlePublish = async () => {
  if (!checkMultiReplyPublish()) {
    return
  }

  const res = await useComponentMessageStore().alert('确认发布吗？')
  if (!res) return
  if (isPublishing.value) return

  isPublishing.value = true
  useMessage(10201, 'info')

  const body = {
    topicId: tid.value,
    content: replyDraft.value.mainContent,
    targets: replyDraft.value.targets.map((t) => ({
      targetReplyId: t.targetReplyId,
      content: t.content
    }))
  }

  const reply = await $fetch(`/api/topic/${tid.value}/reply`, {
    method: 'POST',
    body,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (reply) {
    isEdit.value = false
    tempReply.value.push(reply)
    usePersistKUNGalgameReplyStore().resetReplyDraft()
    useMessage(10243, 'success')
  }
}

const handleRewrite = async () => {
  if (!checkRewritePublish() || !replyRewrite.value) {
    return
  }

  const res = await useComponentMessageStore().alert('确定提交编辑吗?')
  if (!res) return
  if (isPublishing.value) return

  isPublishing.value = true
  useMessage(10201, 'info')

  const body = {
    replyId: replyRewrite.value.id,
    content: replyRewrite.value.mainContent,
    targets: replyRewrite.value.targets.map((t) => ({
      targetReplyId: t.targetReplyId,
      content: t.content
    }))
  }

  const result = await $fetch(`/api/topic/reply`, {
    method: 'PUT',
    body,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    useMessage(10244, 'success')

    tempReply.value.push(result)
    useTempReplyStore().resetRewriteReplyData()
    isEdit.value = false
  }
}
</script>

<template>
  <div class="flex justify-end gap-1">
    <KunButton color="danger" variant="light" @click="isEdit = false">
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
</template>
