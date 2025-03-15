<script setup lang="ts">
const props = defineProps<{
  lang: Language
  type: 'publish' | 'rewrite'
}>()

const { introduction } = storeToRefs(usePersistEditGalgameStore())
const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const valueMarkdown = computed(() => {
  if (props.type === 'publish') {
    return introduction.value[props.lang]
  } else {
    return galgamePR.value[0].introduction[props.lang]
  }
})

const saveMarkdown = debounce((editorMarkdown: string) => {
  if (props.type === 'publish') {
    introduction.value[props.lang] = editorMarkdown
  } else {
    galgamePR.value[0].introduction[props.lang] = editorMarkdown
  }
}, 107)
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="valueMarkdown"
    @set-markdown="saveMarkdown"
    :language="lang ?? 'zh-cn'"
  >
    <NuxtLink
      target="_blank"
      to="/topic/280"
      class="text-default-700 hover:text-primary transition-colors"
    >
      Galgame 发布规定
    </NuxtLink>
  </KunMilkdownDualEditorProvider>
</template>
