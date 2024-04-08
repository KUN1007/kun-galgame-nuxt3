<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const {
  content: rewriteContent,
  isTopicRewriting,
  autosaveCount
} = storeToRefs(useTempEditStore())

const { content: editContent } = storeToRefs(usePersistEditTopicStore())

const valueMarkdown = ref('')

if (isTopicRewriting.value) {
  valueMarkdown.value = rewriteContent.value
} else {
  valueMarkdown.value = editContent.value
}

const saveMarkdown = debounce((editorMarkdown: string) => {
  if (isTopicRewriting.value) {
    rewriteContent.value = editorMarkdown
  } else {
    editContent.value = editorMarkdown
  }

  autosaveCount.value++
}, 107)
</script>

<template>
  <div class="editor">
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownEditor
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          editor-height="300"
          :is-show-menu="true"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
