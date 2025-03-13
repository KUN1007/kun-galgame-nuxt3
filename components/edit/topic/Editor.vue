<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const {
  content: rewriteContent,
  isTopicRewriting,
  autosaveCount
} = storeToRefs(useTempEditStore())

const { content: editContent } = storeToRefs(usePersistEditTopicStore())
const { mode } = storeToRefs(usePersistEditTopicStore())

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
  <MilkdownProvider v-if="mode === 'preview'">
    <ProsemirrorAdapterProvider>
      <KunMilkdownEditor
        @save-markdown="saveMarkdown"
        :value-markdown="valueMarkdown"
        editor-height="300"
      />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>
