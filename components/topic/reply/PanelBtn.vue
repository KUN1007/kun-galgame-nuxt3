<script setup lang="ts">
import { checkReplyPublish } from '../utils/checkReplyPublish'

const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})

const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isEdit, isReplyRewriting, replyRewrite, tempReply } =
  storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())
const isPublishing = ref(false)

const handlePublish = async () => {
  if (!checkReplyPublish(replyDraft.value.tags, replyDraft.value.content)) {
    return
  }

  const res = await useComponentMessageStore().alert('确认发布吗？')
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(10201, 'info')
  }
  const reply = await $fetch(`/api/topic/${tid.value}/reply`, {
    method: 'POST',
    body: { ...replyDraft.value, time: Date.now() },
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
  if (
    !checkReplyPublish(
      replyRewrite.value[0].tags,
      replyRewrite.value[0].markdown
    )
  ) {
    return
  }

  const res = await useComponentMessageStore().alert('确定提交吗?')
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(10201, 'info')
  }
  const result = await $fetch(`/api/topic/${tid.value}/reply`, {
    method: 'PUT',
    body: {
      rid: replyRewrite.value[0].rid,
      content: replyRewrite.value[0].markdown,
      tags: replyRewrite.value[0].tags,
      edited: Date.now()
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    useMessage(10244, 'success')
    useTempReplyStore().resetRewriteReplyData()
    isShowAdvance.value = false
    isEdit.value = false
  }
}
</script>

<template>
  <div class="flex justify-end gap-1">
    <KunButton size="lg" v-if="!isReplyRewriting" @click="handlePublish">
      确认发布
    </KunButton>

    <KunButton size="lg" v-if="isReplyRewriting" @click="handleRewrite">
      确定编辑
    </KunButton>
  </div>
</template>
