<script setup lang="ts">
import { useTopicEditorStore } from '~/composables/topic/useTopicEditorStore'

const { title } = useTopicEditorStore()
const maxInputLength = 40
</script>

<template>
  <KunInput
    type="text"
    placeholder="请在标题中点名您话题的主旨"
    v-model="title"
    :maxlength="maxInputLength"
    size="xl"
    class-name="text-2xl font-bold bg-transparent shadow-none"
  />
</template>
