<script setup lang="ts">
const model = defineModel<string>({ required: true })

const saveMarkdown = (editorMarkdown: string) => {
  model.value = editorMarkdown
}
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="model"
    @set-markdown="saveMarkdown"
  />
</template>
