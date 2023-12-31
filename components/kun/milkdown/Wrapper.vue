<script setup lang="ts">
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
  routeName.value === 'edit' ? editEditorHeight.value : replyEditorHeight.value
)

onBeforeMount(() => {
  if (isSaveTopic.value && routeName.value === 'edit') {
    valueMarkdown.value = editContent.value
  }
  if (isTopicRewriting.value && routeName.value === 'edit') {
    valueMarkdown.value = rewriteContent.value
  }
  if (isSaveReply.value && routeName.value === 'topic-tid') {
    valueMarkdown.value = replyDraft.value.content
  }
  if (isReplyRewriting.value && routeName.value === 'topic-tid') {
    valueMarkdown.value = replyRewrite.value.content
  }
})

const saveMarkdown = (editorMarkdown: string) => {
  const debouncedUpdateContent = debounce(() => {
    if (!isTopicRewriting.value && routeName.value === 'edit') {
      editContent.value = editorMarkdown
    }
    if (isTopicRewriting.value && routeName.value === 'edit') {
      rewriteContent.value = editorMarkdown
    }
    if (!isReplyRewriting.value && routeName.value === 'topic-tid') {
      replyDraft.value.content = editorMarkdown
    }
    if (isReplyRewriting.value && routeName.value === 'topic-tid') {
      replyRewrite.value.content = editorMarkdown
    }
  }, 1007)

  debouncedUpdateContent()
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
