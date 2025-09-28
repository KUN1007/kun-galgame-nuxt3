<script setup lang="ts">
import { useTopicEditorStore } from '~/composables/topic/useTopicEditorStore'
import { KUN_TOPIC_TITLE_LENGTH_LIMIT } from '~/config/limit'

const { title } = useTopicEditorStore()
</script>

<template>
  <KunInput
    type="text"
    placeholder="请在标题中点名您话题的主旨"
    v-model="title"
    :maxlength="KUN_TOPIC_TITLE_LENGTH_LIMIT"
    size="xl"
    class-name="text-2xl font-bold bg-transparent"
  />
</template>
