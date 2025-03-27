<script setup lang="ts">
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const valueMarkdown = ref(
  isReplyRewriting.value
    ? replyRewrite.value[0].markdown
    : replyDraft.value.content
)

const saveMarkdown = (editorMarkdown: string) => {
  if (isReplyRewriting.value) {
    replyRewrite.value[0].markdown = editorMarkdown
  } else {
    replyDraft.value.content = editorMarkdown
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
