<script setup lang="ts">
const { uid } = usePersistUserStore()
const { isEdit } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const props = defineProps<{
  targetUserName: string
  targetUserId: number
  targetFloor: number
}>()

const handleClickReply = () => {
  if (!uid) {
    useMessage(10237, 'warn', 5000)
    return
  }

  replyDraft.value.targetUserName = props.targetUserName
  replyDraft.value.targetUserId = props.targetUserId
  replyDraft.value.targetFloor = props.targetFloor

  isEdit.value = true
}
</script>

<template>
  <KunButton variant="flat" @click="handleClickReply">回复</KunButton>
</template>
