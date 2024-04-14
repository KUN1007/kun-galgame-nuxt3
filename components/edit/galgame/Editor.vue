<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const props = defineProps<{
  lang: Language
  type: 'publish' | 'rewrite'
  pending?: boolean
}>()

const { introduction } = storeToRefs(usePersistEditGalgameStore())
const { rewriteDraft } = storeToRefs(useTempGalgameRewriteStore())

const valueMarkdown = computed(() => {
  if (props.type === 'publish') {
    return introduction.value[props.lang]
  } else {
    return rewriteDraft.value[0].introduction[props.lang]
  }
})

const saveMarkdown = debounce((editorMarkdown: string) => {
  if (props.type === 'publish') {
    introduction.value[props.lang] = editorMarkdown
  } else {
    rewriteDraft.value[0].introduction[props.lang] = editorMarkdown
  }
}, 107)
</script>

<template>
  <div>
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownNoImage
          @save-markdown="saveMarkdown"
          :value-markdown="valueMarkdown"
          :language="lang"
          :pending="pending"
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>
