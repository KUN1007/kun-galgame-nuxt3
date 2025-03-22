<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  toc: { links?: TocLink[] }
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

  props.toc?.links?.forEach((link) => {
    const element = document.getElementById(link.id)
    if (element) {
      observer?.observe(element)
    }
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <aside class="fixed right-0 hidden w-64 shrink-0 space-y-8 lg:block">
    <div class="sticky top-0">
      <h3 class="p-3 text-xl font-semibold">页面目录</h3>
      <nav v-if="toc && toc.links" class="toc">
        <ul class="space-y-2">
          <li v-for="link in toc.links" :key="link.id" class="toc-link">
            <a
              :href="`#${link.id}`"
              @click="
                (e) => {
                  e.preventDefault()
                  scrollToHeading(link.id)
                }
              "
              class="block py-1 text-sm transition-colors duration-200"
              :class="[
                { 'pl-4': link.depth === 2, 'pl-8': link.depth === 3 },
                activeId === link.id
                  ? 'text-primary text-base font-medium'
                  : 'text-default-700 hover:text-primary'
              ]"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </nav>

      <KunNull v-if="!toc" description="本页面无目录" />
    </div>
  </aside>
</template>
