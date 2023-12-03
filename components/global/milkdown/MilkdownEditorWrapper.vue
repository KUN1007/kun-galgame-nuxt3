<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from '@/utils/debounce'
// Milkdown
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
import MilkdownEditor from './MilkdownEditor.vue'

// KUN Visual Novel store
import { useTempEditStore } from '@/store/temp/edit'
import { useKUNGalgameEditStore } from '@/store/modules/edit'
import { useTempReplyStore } from '@/store/temp/topic/reply'
import { usePersistKUNGalgameReplyStore } from '@/store/modules/topic/reply'
import { storeToRefs } from 'pinia'

const { content: rewriteContent, isTopicRewriting } = storeToRefs(
  useTempEditStore()
)
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
// Current page route name
const routeName = computed(() => route.name as string)
const valueMarkdown = ref('')

// Editor height, determined by the route name
const editorHeightStyle = computed(() =>
  routeName.value === 'Edit' ? editEditorHeight.value : replyEditorHeight.value
)

onBeforeMount(() => {
  /**
   * Editor is in the edit mode
   */
  // Load topic data before mounting if not saved (and must be on the Edit page)
  if (isSaveTopic.value && routeName.value === 'Edit') {
    valueMarkdown.value = editContent.value
  }
  /**
   * Editor is in the re-editing edit mode
   */
  // Load data for re-editing a topic before mounting
  if (isTopicRewriting.value && routeName.value === 'Edit') {
    valueMarkdown.value = rewriteContent.value
  }
  /**
   * Editor is in the reply mode
   */
  // Load reply data before mounting if not saved (and must be on the Topic page)
  if (isSaveReply.value && routeName.value === 'Topic') {
    valueMarkdown.value = replyDraft.value.content
  }
  /**
   * Editor is in the re-editing reply mode
   */
  if (isReplyRewriting.value && routeName.value === 'Topic') {
    valueMarkdown.value = replyRewrite.value.content
  }
})

const saveMarkdown = (editorMarkdown: string) => {
  // Create a debounce function
  const debouncedUpdateContent = debounce(() => {
    /**
     * Editor is in edit mode
     */
    // Save to the edit store if not in topic re-edit mode
    if (!isTopicRewriting.value && routeName.value === 'Edit') {
      editContent.value = editorMarkdown
    }
    /**
     * Editor is in re-editing edit mode
     */
    // Load data for re-editing a topic before mounting
    if (isTopicRewriting.value && routeName.value === 'Edit') {
      rewriteContent.value = editorMarkdown
    }
    /**
     * Editor is in reply mode
     */
    // Save to the reply store if not in reply re-edit mode
    if (!isReplyRewriting.value && routeName.value === 'Topic') {
      replyDraft.value.content = editorMarkdown
    }
    /**
     * Editor is in re-editing reply mode
     */
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
        <MilkdownEditor
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          :editor-hight="editorHeightStyle.toString()"
          :is-show-menu="isShowMenu"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
