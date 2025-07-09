<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  reply: TopicReply
}>()

const { setRewriteData } = useTempReplyStore()
const { isEdit } = storeToRefs(useTempReplyStore())
const { id } = usePersistUserStore()

const isShowRewrite = computed(() => id === props.reply.user.id)

const handleClickRewrite = () => {
  setRewriteData(props.reply)
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
      @click="handleClickRewrite"
    >
      <KunIcon name="lucide:pencil" />
    </KunButton>
  </KunTooltip>
</template>
