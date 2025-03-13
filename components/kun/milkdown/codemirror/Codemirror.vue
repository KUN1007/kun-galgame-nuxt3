<script setup lang="ts">
import { createCodeMirrorState, createCodeMirrorView } from './setup'

interface Props {
  markdown: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  updateCmAPI: [{ update: (markdown: string) => void }]
  onChange: [value: string]
}>()

const editorDiv = ref<HTMLDivElement | null>(null)
let editor: ReturnType<typeof createCodeMirrorView> | null = null

onMounted(() => {
  if (!editorDiv.value) {
    return
  }

  editor = createCodeMirrorView({
    root: editorDiv.value,
    onChange: (getString) => emit('onChange', getString()),
    content: props.markdown
  })

  emit('updateCmAPI', {
    update: (markdown: string) => {
      const state = createCodeMirrorState({
        onChange: (getString) => emit('onChange', getString()),
        content: markdown
      })
      editor?.setState(state)
    }
  })
})

onBeforeUnmount(() => {
  editor?.destroy()
})

watch(
  () => props.markdown,
  (newMarkdown) => {
    if (editor && editor.state.doc.toString() !== newMarkdown) {
      const state = createCodeMirrorState({
        onChange: (getString) => emit('onChange', getString()),
        content: newMarkdown
      })
      editor.setState(state)
    }
  }
)
</script>

<template>
  <div
    ref="editorDiv"
    class="scrollbar-hide flex-1 overflow-y-scroll overscroll-none"
  />
</template>
