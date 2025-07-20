<script setup lang="ts">
import type { Toc, TocLink } from '@nuxt/content'

const props = defineProps<{
  toc: Toc
}>()

const activeId = ref<string | null>(null)

const scrollToHeading = (id: string) => {
  const headingElement = document.getElementById(id)
  if (headingElement) {
    headingElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

const getAllHeadingIds = (links: TocLink[]): string[] => {
  return links.reduce((acc: string[], link) => {
    acc.push(link.id)
    if (link.children && link.children.length > 0) {
      acc.push(...getAllHeadingIds(link.children))
    }
    return acc
  }, [])
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-100px 0px -66%',
      threshold: 1.0
    }
  )

  if (props.toc?.links) {
    const allHeadingIds = getAllHeadingIds(props.toc.links)
    allHeadingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer?.observe(element)
      }
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <aside class="hidden w-64 shrink-0 space-y-8 lg:block">
    <h3 class="p-3 text-xl font-semibold">页面目录</h3>
    <nav
      class="scrollbar-hide max-h-[calc(100dvh-12rem)] overflow-y-auto"
      v-if="toc?.links"
    >
      <DocDetailTOCLink
        :links="toc.links"
        :active-id="activeId"
        @scroll-to="scrollToHeading"
      />
    </nav>
    <KunNull v-if="!toc" description="本页面无目录" />
  </aside>
</template>
