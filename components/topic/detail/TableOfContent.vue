<script setup lang="ts">
import { scrollToTOCElement } from '../_helper'

interface TOCItem {
  id: string
  text: string
  level: number
  type: 'heading' | 'reply'
}

const headings = ref<TOCItem[]>([])
const activeId = ref('')

onMounted(() => {
  const elements = Array.from(
    document.querySelectorAll('article h1, article h2, article h3, .kun-reply')
  )

  headings.value = elements.map((element) => {
    if (element.matches('h1, h2, h3')) {
      return {
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
        type: 'heading' as const
      }
    } else {
      const [floor, content] = element.id.split('.', 2)
      return {
        id: element.id,
        text: content ? `${floor}. ${content}` : floor,
        level: 2,
        type: 'reply' as const
      }
    }
  })

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting)
      if (visibleEntry) activeId.value = visibleEntry.target.id
    },
    { rootMargin: '0px 0px -80% 0px' }
  )

  elements.forEach((element) => observer.observe(element))

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    class-name="h-full max-w-49 inset-shadow-sm"
    content-class="justify-start"
  >
    <h2 class="mb-4 text-lg font-semibold">目录导航</h2>

    <template v-for="type in ['heading', 'reply']" :key="type">
      <template v-if="headings.some((h) => h.type === type)">
        <h3 class="mb-2 text-sm font-medium">
          {{ type === 'heading' ? '文章目录' : '回复列表' }}
        </h3>
        <ul class="mb-4 space-y-2">
          <li
            v-for="item in headings.filter((h) => h.type === type)"
            :key="item.id"
            :style="{ paddingLeft: `${(item.level - 1) * 1}rem` }"
          >
            <a
              :href="`#${item.id}`"
              @click.prevent="scrollToTOCElement(item.id)"
              :class="
                cn(
                  'hover:text-primary-500 block py-1 text-sm',
                  activeId === item.id
                    ? 'text-primary-500 font-medium'
                    : 'text-default-600 dark:text-default-400'
                )
              "
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </template>
    </template>
  </KunCard>
</template>
