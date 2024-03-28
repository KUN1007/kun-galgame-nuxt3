<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const props = defineProps<{
  isShowMenu: boolean
}>()
const isShowMenu = computed(() => props.isShowMenu)

const valueMarkdown = ref('')

if (isReplyRewriting.value) {
  valueMarkdown.value = replyRewrite.value.content
} else {
  valueMarkdown.value = replyDraft.value.content
}

const saveMarkdown = debounce((editorMarkdown: string) => {
  if (isReplyRewriting.value) {
    replyRewrite.value.content = editorMarkdown
  } else {
    replyDraft.value.content = editorMarkdown
  }
}, 1007)
</script>

<template>
  <div class="editor">
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownEditor
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          editor-hight="200"
          :is-show-menu="isShowMenu"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
