<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  reply: TopicReply
}>()

const { id, role } = usePersistUserStore()
const topicUserId = inject<number>('topicUserId')

const isDisabled = role < 2 && topicUserId !== id

const handleUpdateTopicBestAnswer = async () => {
  const res = await useComponentMessageStore().alert(
    props.reply.isBestAnswer
      ? '您确定取消设置该回复为最佳答案吗, 该操作将会扣除该回复人 7 萌萌点'
      : '您确定设置这个回复为最佳答案吗， 该操作将会为该回复人增加 7 萌萌点'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.reply.topicId}/best-answer`, {
    method: 'PUT',
    watch: false,
    body: { topicId: props.reply.topicId, replyId: props.reply.id },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(
      props.reply.isBestAnswer ? '取消设置最佳答案成功' : '设置最佳答案成功',
      'success'
    )
  }
}
</script>

<template>
  <KunButton
    variant="light"
    :color="reply.isBestAnswer ? 'warning' : 'default'"
    size="sm"
    :disabled="isDisabled"
    @click="handleUpdateTopicBestAnswer"
    class-name="whitespace-nowrap gap-2 justify-start"
  >
    <KunIcon class-name="text-lg" name="lucide:bookmark-check" />
    {{ reply.isBestAnswer ? '取消设置最佳答案' : '将该回复设为最佳答案' }}
  </KunButton>
</template>
