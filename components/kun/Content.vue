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

const articleRef = ref<HTMLElement | null>(null)

const handleContentClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target && target.matches('.copy')) {
    const container = target.closest('.kun-code-container')
    if (!container) return

    const pre = container.querySelector('pre')
    if (!pre) return

    const codeToCopy = pre.innerText

    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        target.classList.add('copied')
        setTimeout(() => {
          target.classList.remove('copied')
        }, 3000)
      })
      .catch((err) => {
        useMessage('复制失败', 'error')
      })
  }
}

onMounted(() => {
  articleRef.value?.addEventListener('click', handleContentClick)
})

onBeforeUnmount(() => {
  articleRef.value?.removeEventListener('click', handleContentClick)
})

const sanitizeConfig = {
  ADD_TAGS: ['div', 'span', 'button'],
  ADD_ATTR: ['class', 'title', 'line']
}
</script>

<template>
  <div>
    <article
      ref="articleRef"
      :class="cn('kun-prose break-all', className)"
      v-html="DOMPurify.sanitize(content, sanitizeConfig)"
    />
  </div>
</template>
