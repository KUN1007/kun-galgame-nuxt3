<script setup lang="ts">
const { isEdit } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const props = defineProps<{
  tid: number
  toUserName: string
  toUid: number
  toFloor: number
}>()

const handleClickReply = () => {
  replyDraft.value.tid = props.tid
  replyDraft.value.toUserName = props.toUserName
  replyDraft.value.toUid = props.toUid
  replyDraft.value.toFloor = props.toFloor

  isEdit.value = true
}
</script>

<template>
  <div @click="handleClickReply" class="reply">
    {{ $t('topic.content.reply') }}
  </div>
</template>

<style lang="scss" scoped>
.reply {
  position: relative;
  width: 70px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-blue-4);
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 10px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    border: 2px solid transparent;
    box-sizing: border-box;
  }
  &:hover {
    color: var(--kungalgame-pink-4);

    &::before {
      transition:
        width 0.2s,
        height 0.2s,
        border-bottom-color 0s;
      transition-delay: 0.2s, 0s, 0.2s;
      width: 70px;
      height: 30px;
      border-left: 2px solid var(--kungalgame-pink-4);
      border-bottom: 2px solid var(--kungalgame-pink-4);
    }

    &::after {
      transition:
        width 0.2s,
        height 0.2s,
        border-right-color 0.2s;
      transition-delay: 0s, 0.2s, 0.2s;
      width: 70px;
      height: 30px;
      border-top: 2px solid var(--kungalgame-pink-4);
      border-right: 2px solid var(--kungalgame-pink-4);
    }
  }
}

@media (max-width: 700px) {
  .reply {
    margin-right: 0;
  }
}
</style>
