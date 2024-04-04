<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const props = defineProps<{
  lang: Language
  pending: boolean
}>()

const { introduction } = storeToRefs(usePersistGalgameStore())

const saveMarkdown = debounce((editorMarkdown: string) => {
  introduction.value[props.lang] = editorMarkdown
}, 107)
</script>

<template>
  <div>
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownNoImage
          @save-markdown="saveMarkdown"
          :value-markdown="introduction[lang]"
          :language="lang"
          :pending="pending"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
