<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const props = defineProps<{
  lang: Language
}>()

const { introduction } = storeToRefs(usePersistGalgameStore())

const valueMarkdown = ref('')

valueMarkdown.value = introduction.value[props.lang]

const saveMarkdown = debounce((editorMarkdown: string) => {
  introduction.value[props.lang] = editorMarkdown
}, 1007)
</script>

<template>
  <div class="editor">
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownEditor
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          editor-hight="300"
          :is-show-menu="true"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
