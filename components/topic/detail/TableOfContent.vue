<script setup lang="ts">
interface TOCItem {
  id: string
  text: string
  level: number
}

const headings = ref<TOCItem[]>([])
const activeId = ref('')

const scrollToHeading = (id: string) => {
  const headingElement = document.getElementById(id)
  if (headingElement) {
    headingElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

onMounted(() => {
  const elements = Array.from(
    document.querySelectorAll('article h1, article h2, article h3')
  ).map((element) => ({
    id: element.id,
    text: element.textContent || '',
    level: Number(element.tagName.charAt(1))
  }))
  headings.value = elements

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    { rootMargin: '0px 0px -80% 0px' }
  )

  document
    .querySelectorAll('article h1, article h2, article h3')
    .forEach((heading) => {
      observer.observe(heading)
    })

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    class-name="hidden w-52 shrink-0 lg:block"
    content-class="justify-start"
  >
    <h2 class="mb-4 text-lg font-semibold">本文索引</h2>
    <ul class="space-y-2">
      <li
        v-for="heading in headings"
        :key="heading.id"
        :style="{ paddingLeft: `${(heading.level - 1) * 1}rem` }"
      >
        <a
          :href="`#${heading.id}`"
          @click.prevent="scrollToHeading(heading.id)"
          :class="
            cn(
              'hover:text-primary-500 block py-1 text-sm',
              activeId === heading.id
                ? 'text-primary-500 font-medium'
                : 'text-default-600 dark:text-default-400'
            )
          "
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </KunCard>
</template>
