<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  comment: TopicComment
}>()

const emits = defineEmits<{
  removeComment: [commentId: number]
}>()

const { id, moemoepoint, role } = usePersistUserStore()

const isCommonUser = role < 2
const isAdmin = role > 1
const canDelete = computed(() => id === props.comment.user.id || isAdmin)

const handleDeleteComment = async () => {
  const moemoepointToDecrease = 3 * (props.comment.likeCount + 1)

  if (moemoepoint < moemoepointToDecrease && isCommonUser) {
    useMessage(
      `您的萌萌点不足, 删除这个评论将会消耗您 ${moemoepointToDecrease} 萌萌点。删除消耗萌萌点计算公式为 3 × (评论被点赞数 + 1)`,
      'warn'
    )
    return
  }

  const res = await useComponentMessageStore().alert(
    isCommonUser
      ? '你这个坏萝莉, 确定删除这个评论吗?'
      : '你好萝莉管理员, 要删除这个评论吗',
    isCommonUser
      ? `删除这个评论将会消耗 ${moemoepointToDecrease} 萌萌点, 严重注意, 删除操作不可撤销！删除消耗萌萌点计算公式为 3 × (评论被点赞数 + 1)`
      : '删除这个评论将会消耗发布评论者 3 萌萌点, 该操作不可撤销'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.comment.topicId}/comment`, {
    method: 'DELETE',
    watch: false,
    query: { commentId: props.comment.id },
    ...kungalgameResponseHandler
  })

  if (result) {
    emits('removeComment', props.comment.id)
    useMessage('删除评论成功', 'success')
  }
}
</script>

<template>
  <KunButton
    v-if="canDelete"
    :is-icon-only="true"
    variant="light"
    color="danger"
    @click="handleDeleteComment"
  >
    <KunIcon name="lucide:trash-2" />
  </KunButton>
</template>
