<script setup lang="ts">
const {
  content: rewriteContent,
  isTopicRewriting,
  autosaveCount
} = storeToRefs(useTempEditStore())

const { content: editContent } = storeToRefs(usePersistEditTopicStore())

const valueMarkdown = ref(
  isTopicRewriting.value ? rewriteContent.value : editContent.value
)

const saveMarkdown = (editorMarkdown: string) => {
  const targetContent = isTopicRewriting.value ? rewriteContent : editContent
  targetContent.value = editorMarkdown
  valueMarkdown.value = editorMarkdown
  autosaveCount.value++
}
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="valueMarkdown"
    @set-markdown="saveMarkdown"
  >
    <NuxtLink
      to="/topic/280"
      class="text-default-700 hover:text-primary transition-colors"
    >
      话题发布规定
    </NuxtLink>
  </KunMilkdownDualEditorProvider>
</template>
