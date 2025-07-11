<script setup lang="ts">
import { useTopicEditorStore } from '~/composables/topic/useTopicEditorStore'

const { content } = useTopicEditorStore()
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="content"
    @set-markdown="(val) => (content = val)"
  >
    <KunLink
      underline="hover"
      to="/doc/notice/topic-publish-rule"
      target="_blank"
      size="sm"
    >
      话题发布规定
    </KunLink>
  </KunMilkdownDualEditorProvider>
</template>
