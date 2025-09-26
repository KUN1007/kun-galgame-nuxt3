<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  reply: TopicReply
}>()

const tempReplyStore = useTempReplyStore()
const { id, moemoepoint, role } = usePersistUserStore()

const isCommonUser = role < 2
const isDisabled = computed(() => id !== props.reply.user.id && isCommonUser)

const handleDeleteReply = async () => {
  const moemoepointToDecrease =
    3 *
    (props.reply.comment.length +
      props.reply.likeCount +
      props.reply.targets.length +
      props.reply.targetByCount +
      1)

  if (moemoepoint < moemoepointToDecrease && isCommonUser) {
    useMessage(
      `您的萌萌点不足, 删除这个回复将会消耗您 ${moemoepointToDecrease} 萌萌点。删除消耗萌萌点计算公式为 3 × (回复下评论数 + 回复被点赞数 + 回复目标数 + 引用这个回复的回复数 + 1)`,
      'warn'
    )
    return
  }

  const res = await useComponentMessageStore().alert(
    isCommonUser
      ? '你这个坏萝莉, 确定删除这个回复吗?'
      : '你好萝莉管理员, 要删除这个回复吗',
    isCommonUser
      ? `删除这个回复将会消耗 ${moemoepointToDecrease} 萌萌点, 严重注意, 删除操作不可撤销！删除消耗萌萌点计算公式为 3 × (回复下评论数 + 回复被点赞数 + 回复目标数 + 引用这个回复的回复数 + 1)`
      : '删除这个回复将会消耗发布回复者 3 萌萌点, 该操作不可撤销'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.reply.topicId}/reply`, {
    method: 'DELETE',
    watch: false,
    query: { replyId: props.reply.id },
    ...kungalgameResponseHandler
  })

  if (result) {
    tempReplyStore.setSuccessfulReply({ data: props.reply, type: 'deleted' })
    useMessage('删除回复成功', 'success')
  }
}
</script>

<template>
  <KunButton
    variant="light"
    color="danger"
    size="sm"
    @click="handleDeleteReply"
    class-name="whitespace-nowrap gap-2 justify-start"
    :disabled="isDisabled"
  >
    <KunIcon class-name="text-lg" name="lucide:trash-2" />
    删除回复
  </KunButton>
</template>
