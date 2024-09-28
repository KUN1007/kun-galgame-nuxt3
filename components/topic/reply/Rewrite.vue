<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  reply: TopicReply
}>()

const { isEdit, isReplyRewriting, replyRewrite } =
  storeToRefs(useTempReplyStore())
const { uid } = usePersistUserStore()

const isShowRewrite = computed(() => uid === props.reply.user.uid)

const rewriteReply = () => {
  replyRewrite.value.push(props.reply)

  isReplyRewriting.value = true
  isEdit.value = true
}
</script>

<template>
  <span v-if="isShowRewrite" @click="rewriteReply" class="icon">
    <Icon class="icon" name="lucide:pencil" />
  </span>
</template>

<style lang="scss" scoped></style>
