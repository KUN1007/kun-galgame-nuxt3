<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'
import { useSpoilerContent } from '~/composables/topic/useSpoilerContent'
import 'katex/dist/katex.min.css'

withDefaults(
  defineProps<{
    content: string
    className?: string
  }>(),
  {
    className: ''
  }
)

const articleRef = ref<HTMLElement | null>(null)

useSpoilerContent(articleRef)

const sanitizeConfig = {
  ADD_TAGS: ['div', 'span', 'button'],
  ADD_ATTR: ['class', 'title', 'line']
}
</script>

<template>
  <div>
    <article
      ref="articleRef"
      :class="cn('kun-prose', className)"
      v-html="DOMPurify.sanitize(content, sanitizeConfig)"
    />
  </div>
</template>

<style scoped lang="scss">
.kun-prose {
  :deep(.kun-spoiler) {
    position: relative;
    display: inline-block;
    border-radius: 0.5rem;
    overflow: hidden;
    vertical-align: middle;

    .spoiler-frost {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: rgb(150, 150, 150);
      border-radius: inherit;
      transform: translateZ(0);
      z-index: 5;
    }

    & > *:not(.spoiler-canvas) {
      transition: filter 0.3s ease-in-out;
      filter: blur(0);
    }

    .spoiler-canvas {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
      background-color: rgba(150, 150, 150, 0.1);

      &.fade-out {
        opacity: 0;
      }
    }
  }

  :deep(.kun-spoiler.kun-spoiler-hidden) {
    cursor: pointer;

    & > *:not(.spoiler-canvas) {
      filter: blur(52px);
      user-select: none;
    }
  }

  :deep(div.kun-spoiler) {
    display: block;
    width: fit-content;
  }
}
</style>
