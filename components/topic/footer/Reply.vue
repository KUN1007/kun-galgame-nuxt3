<script setup lang="ts">
const { uid } = usePersistUserStore()
const { isEdit } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const props = defineProps<{
  toUserName: string
  toUid: number
  toFloor: number
}>()

const handleClickReply = () => {
  if (!uid) {
    useMessage(10237, 'warn', 5000)
    return
  }

  replyDraft.value.toUserName = props.toUserName
  replyDraft.value.toUid = props.toUid
  replyDraft.value.toFloor = props.toFloor

  isEdit.value = true
}
</script>

<template>
  <KunButton variant="flat" @click="handleClickReply">回复</KunButton>
</template>
