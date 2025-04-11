<script setup lang="ts">
import { KUN_TOPIC_REPLY_PANEL_POSITION_MAP } from '~/constants/topic'

const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())

const position = computed(() => {
  return replyDraft.value.toFloor === 0 ? 'master' : 'reply'
})

const handleClosePanel = async () => {
  if (isReplyRewriting.value) {
    const res = await useComponentMessageStore().alert(
      '确认关闭面板吗？您的更改将不会被保存。'
    )

    if (res) {
      useTempReplyStore().resetRewriteReplyData()
    } else {
      return
    }
  }
  isEdit.value = false
}
</script>

<template>
  <Teleport to="body" :disabled="!isEdit">
    <Transition
      enter-active-class="animate-fadeInUp"
      leave-active-class="animate-fadeOutDown"
    >
      <div
        class="fixed bottom-0 z-100 flex max-h-[70%] w-full flex-col items-center"
        v-if="isEdit"
      >
        <div
          class="bg-background w-full max-w-4xl overflow-y-auto rounded-lg p-3 shadow"
        >
          <div class="flex items-center justify-between">
            <h3>
              {{
                `回复给 @ ${replyDraft.toUserName} - ${KUN_TOPIC_REPLY_PANEL_POSITION_MAP[position]} ${replyDraft.toFloor}`
              }}
            </h3>
            <KunButton
              color="default"
              variant="light"
              rounded="full"
              size="lg"
              :is-icon-only="true"
              @click="handleClosePanel"
            >
              <KunIcon name="lucide:x" />
            </KunButton>
          </div>

          <LazyTopicReplyEditor />

          <TopicReplyPanelBtn />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
