<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  reply: TopicReply
}>()

const { isEdit, isReplyRewriting, replyRewrite } =
  storeToRefs(useTempReplyStore())
const { uid } = usePersistUserStore()

const isShowRewrite = computed(() => uid === props.reply.user.id)

const rewriteReply = () => {
  replyRewrite.value.push(props.reply)

  isReplyRewriting.value = true
  isEdit.value = true
}
</script>

<template>
  <KunTooltip text="重新编辑">
    <KunButton
      :is-icon-only="true"
      variant="light"
      color="default"
      size="lg"
      v-if="isShowRewrite"
      @click="rewriteReply"
    >
      <KunIcon name="lucide:pencil" />
    </KunButton>
  </KunTooltip>
</template>
