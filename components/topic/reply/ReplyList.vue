<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  initialReplies: TopicReply[]
  topicId: number
  title: string
}>()

const replies = ref<TopicReply[]>([])
watch(
  () => props.initialReplies,
  (newVal) => {
    replies.value = JSON.parse(JSON.stringify(newVal))
  },
  { immediate: true, deep: true }
)

const isLoadingReply = ref<number | null>(null)

const loadQuotedReply = async (
  targetReplyId: number,
  anchorReplyId: number
) => {
  if (
    isLoadingReply.value === targetReplyId ||
    replies.value.some((r) => r.id === targetReplyId)
  ) {
    const element = document.getElementById(`k${targetReplyId}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  isLoadingReply.value = targetReplyId

  const reply = await $fetch(`/api/topic/${props.topicId}/reply/detail`, {
    method: 'GET',
    query: { replyId: targetReplyId }
  })

  const anchorIndex = replies.value.findIndex((r) => r.id === anchorReplyId)
  if (anchorIndex !== -1) {
    const fullReply: TopicReply = { ...reply, comment: [] }
    replies.value.splice(anchorIndex, 0, fullReply)

    await nextTick()
    document
      .getElementById(`k${targetReplyId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  isLoadingReply.value = null
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <TopicReply
      v-for="reply in replies"
      :key="reply.id"
      :reply="reply"
      :title="title"
      :is-loading-target="isLoadingReply"
      @load-reply="loadQuotedReply"
    />
  </div>
</template>
