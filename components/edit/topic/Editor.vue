<script setup lang="ts">
const { content: rewriteContent, isTopicRewriting } =
  storeToRefs(useTempEditStore())

const { content: editContent } = storeToRefs(usePersistEditTopicStore())

const valueMarkdown = ref(
  isTopicRewriting.value ? rewriteContent.value : editContent.value
)

const saveMarkdown = (editorMarkdown: string) => {
  const targetContent = isTopicRewriting.value ? rewriteContent : editContent
  targetContent.value = editorMarkdown
  valueMarkdown.value = editorMarkdown
}
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="valueMarkdown"
    @set-markdown="saveMarkdown"
  >
    <KunLink to="/topic/280">话题发布规定</KunLink>
  </KunMilkdownDualEditorProvider>
</template>
