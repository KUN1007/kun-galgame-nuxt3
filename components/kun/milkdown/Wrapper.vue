<script setup lang="ts">
// Milkdown
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const { content: rewriteContent, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const {
  editorHeight: editEditorHeight,
  isSaveTopic,
  content: editContent,
} = storeToRefs(useKUNGalgameEditStore())
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

const route = useRoute()
const routeName = computed(() => route.name as string)
const valueMarkdown = ref('')

const editorHeightStyle = computed(() =>
  routeName.value === 'Edit' ? editEditorHeight.value : replyEditorHeight.value
)

onBeforeMount(() => {
  if (isSaveTopic.value && routeName.value === 'Edit') {
    valueMarkdown.value = editContent.value
  }
  if (isTopicRewriting.value && routeName.value === 'Edit') {
    valueMarkdown.value = rewriteContent.value
  }
  if (isSaveReply.value && routeName.value === 'Topic') {
    valueMarkdown.value = replyDraft.value.content
  }
  if (isReplyRewriting.value && routeName.value === 'Topic') {
    valueMarkdown.value = replyRewrite.value.content
  }
})

const saveMarkdown = (editorMarkdown: string) => {
  const debouncedUpdateContent = debounce(() => {
    if (!isTopicRewriting.value && routeName.value === 'Edit') {
      editContent.value = editorMarkdown
    }
    if (isTopicRewriting.value && routeName.value === 'Edit') {
      rewriteContent.value = editorMarkdown
    }
    if (!isReplyRewriting.value && routeName.value === 'Topic') {
      replyDraft.value.content = editorMarkdown
    }
    if (isReplyRewriting.value && routeName.value === 'Topic') {
      replyRewrite.value.content = editorMarkdown
    }
  }, 1007)

  debouncedUpdateContent()
}
</script>

<!-- MilkdownEditorWrapper.vue -->
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
