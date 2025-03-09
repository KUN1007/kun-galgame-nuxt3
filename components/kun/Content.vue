<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'

defineProps<{
  content: string
}>()
</script>

<template>
  <article
    class="kun-prose"
    v-html="DOMPurify.sanitize(content, { ADD_ATTR: ['line'] })"
  />
</template>
