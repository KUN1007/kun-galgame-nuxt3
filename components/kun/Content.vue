<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'

defineProps<{
  content: string
}>()
</script>

<template>
  <div
    class="kungalgame-content"
    v-html="DOMPurify.sanitize(content, { ADD_ATTR: ['line'] })"
  />
</template>

<style lang="scss">
@use '~/assets/css/editor/index.scss';
@use '~/assets/css/editor/kun-content.scss';

.kungalgame-content {
  width: calc(100% - 134px);
  padding-top: 10px;
  padding-right: 17px;

  code[class*='language-'],
  pre[class*='language-'] {
    color: var(--kungalgame-font-color-3);
  }
}

@media (max-width: 700px) {
  .kungalgame-content {
    padding: 10px;
    width: 100%;
  }
}
</style>
