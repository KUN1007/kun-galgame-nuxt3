<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  reply: TopicReply
}>()

const { id, role } = usePersistUserStore()
const topicUserId = inject<number>('topicUserId')

const isDisabled = role < 2 && topicUserId !== id

const handleUpdateReplyPin = async () => {
  const res = await useComponentMessageStore().alert(
    props.reply.isPinned
      ? '您确定取消置顶该回复吗'
      : '您确定将该回复置顶吗? 置顶可以随时设置和取消'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.reply.topicId}/reply/pin`, {
    method: 'PUT',
    watch: false,
    body: { topicId: props.reply.topicId, replyId: props.reply.id },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(
      props.reply.isPinned ? '取消置顶回复成功' : '置顶回复成功',
      'success'
    )
  }
}
</script>

<template>
  <KunButton
    variant="light"
    :color="reply.isPinned ? 'warning' : 'default'"
    size="sm"
    :disabled="isDisabled"
    @click="handleUpdateReplyPin"
    class-name="whitespace-nowrap gap-2 justify-start"
  >
    <KunIcon class-name="text-lg" name="lucide:pin" />
    {{ reply.isPinned ? '取消置顶回复' : '置顶回复' }}
  </KunButton>
</template>
