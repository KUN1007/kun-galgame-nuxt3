<!-- Optimize required, remove duplicate codes -->
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
const textarea = ref<HTMLTextAreaElement | null>(null)

const valueMarkdown = ref(
  isTopicRewriting.value ? rewriteContent.value : editContent.value
)

const autoResizeTextarea = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  }
}

const saveMarkdown = (editorMarkdown: string) => {
  const targetContent = isTopicRewriting.value ? rewriteContent : editContent
  targetContent.value = editorMarkdown
  valueMarkdown.value = editorMarkdown
  autosaveCount.value++
}

const handleInputCodeMarkdown = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  autoResizeTextarea()
  saveMarkdown(target.value)
}

onMounted(() => autoResizeTextarea())

watch(
  () => mode.value,
  async () => {
    await nextTick()

    if (mode.value === 'code') {
      autoResizeTextarea()
    }
  }
)
</script>

<template>
  <MilkdownProvider v-if="mode === 'preview'">
    <ProsemirrorAdapterProvider>
      <KunMilkdownEditor
        @save-markdown="saveMarkdown"
        :value-markdown="valueMarkdown"
        editor-height="300"
        :is-show-menu="true"
      />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>
