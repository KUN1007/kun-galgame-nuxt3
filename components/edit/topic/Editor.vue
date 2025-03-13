<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

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
  <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <KunMilkdownDualEditorProvider
        :value-markdown="valueMarkdown"
        @set-markdown="saveMarkdown"
      />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>
