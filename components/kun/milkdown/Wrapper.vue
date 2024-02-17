<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const {
  content: rewriteContent,
  isTopicRewriting,
  autosaveCount,
} = storeToRefs(useTempEditStore())
const { editorHeight: editEditorHeight, content: editContent } = storeToRefs(
  useKUNGalgameEditStore()
)
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const {
  editorHeight: replyEditorHeight,
  isSaveReply,
  replyDraft,
} = storeToRefs(usePersistKUNGalgameReplyStore())

const props = defineProps<{
  isShowMenu: boolean
}>()
const isShowMenu = computed(() => props.isShowMenu)

const routeName = useRouteName()
const valueMarkdown = ref('')

const editorHeightStyle = computed(() =>
  routeName.value === 'edit' ? editEditorHeight.value : replyEditorHeight.value
)

if (routeName.value === 'edit') {
  if (isTopicRewriting.value) {
    valueMarkdown.value = rewriteContent.value
  } else {
    valueMarkdown.value = editContent.value
  }
}

if (isSaveReply.value && routeName.value === 'topic-tid') {
  valueMarkdown.value = replyDraft.value.content
}
if (isReplyRewriting.value && routeName.value === 'topic-tid') {
  valueMarkdown.value = replyRewrite.value.content
}

const saveMarkdown = (editorMarkdown: string) => {
  debounce(() => {
    if (routeName.value === 'edit') {
      if (isTopicRewriting.value) {
        rewriteContent.value = editorMarkdown
      } else {
        editContent.value = editorMarkdown
      }
    }

    if (!isReplyRewriting.value && routeName.value === 'topic-tid') {
      replyDraft.value.content = editorMarkdown
    }
    if (isReplyRewriting.value && routeName.value === 'topic-tid') {
      replyRewrite.value.content = editorMarkdown
    }

    autosaveCount.value++
  }, 1007)()
}
</script>

<template>
  <div class="editor">
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownEditor
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          :editor-hight="editorHeightStyle.toString()"
          :is-show-menu="isShowMenu"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
