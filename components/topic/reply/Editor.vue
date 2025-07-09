<script setup lang="ts">
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const valueMarkdown = ref(
  isReplyRewriting.value
    ? replyRewrite.value[0].contentMarkdown
    : replyDraft.value.mainContent
)

const saveMarkdown = (editorMarkdown: string) => {
  if (isReplyRewriting.value) {
    replyRewrite.value[0].contentMarkdown = editorMarkdown
  } else {
    replyDraft.value.mainContent = editorMarkdown
  }
  valueMarkdown.value = editorMarkdown
}
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="valueMarkdown"
    @set-markdown="saveMarkdown"
  />
</template>
