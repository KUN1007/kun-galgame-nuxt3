<script setup lang="ts">
import { useTopicEditorStore } from '~/composables/topic/useTopicEditorStore'

const { title } = useTopicEditorStore()
const maxInputLength = 40
</script>

<template>
  <KunInput
    type="text"
    placeholder="请输入一个巨牛逼的标题"
    v-model="title"
    :maxlength="maxInputLength"
    size="xl"
    class-name="text-2xl font-bold bg-transparent shadow-none"
  />
</template>
