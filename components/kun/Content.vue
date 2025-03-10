<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'

withDefaults(
  defineProps<{
    content: string
    className?: string
  }>(),
  {
    className: ''
  }
)
</script>

<template>
  <article
    :class="cn('kun-prose', className)"
    v-html="DOMPurify.sanitize(content, { ADD_ATTR: ['line'] })"
  />
</template>
