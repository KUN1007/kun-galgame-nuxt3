<!-- Optimize required, remove duplicate codes -->
<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { replyDraft, mode } = storeToRefs(usePersistKUNGalgameReplyStore())

const props = defineProps<{
  isShowMenu: boolean
}>()
const isShowMenu = computed(() => props.isShowMenu)
const textarea = ref<HTMLTextAreaElement | null>(null)

const valueMarkdown = ref(
  isReplyRewriting.value
    ? replyRewrite.value[0].markdown
    : replyDraft.value.content
)

const autoResizeTextarea = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  }
}

const saveMarkdown = (editorMarkdown: string) => {
  if (isReplyRewriting.value) {
    replyRewrite.value[0].markdown = editorMarkdown
  } else {
    replyDraft.value.content = editorMarkdown
  }
  valueMarkdown.value = editorMarkdown
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
  <div class="editor">
    <MilkdownProvider v-if="mode === 'preview'">
      <ProsemirrorAdapterProvider>
        <KunMilkdownEditor
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          editor-height="200"
          :is-show-menu="isShowMenu"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>

    <div class="code-editor" v-if="mode === 'code'">
      <KunMilkdownPluginsModeToggle />
      <textarea
        class="code"
        maxlength="100007"
        :value="valueMarkdown"
        @input="handleInputCodeMarkdown($event)"
        ref="textarea"
        autofocus
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-editor {
  textarea {
    border: none;
    width: 100%;
    height: 100%;
    min-height: 200px;
    background-color: transparent;
    font-size: 16px;
    font-family: inherit;
    color: var(--kungalgame-font-color-2);
    padding: 10px;
    resize: none;
  }
}
</style>
