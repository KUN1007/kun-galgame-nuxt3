<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  toc: { links?: TocLink[] }
}>()
</script>

<template>
  <aside class="fixed right-0 hidden w-64 shrink-0 space-y-8 lg:block">
    <div class="sticky top-0">
      <h3 class="p-3 text-xl font-semibold">页面目录</h3>
      <nav v-if="toc && toc.links" class="toc">
        <ul class="space-y-2">
          <li v-for="link in toc.links" :key="link.id" class="toc-link">
            <NuxtLink
              :to="`#${link.id}`"
              class="text-default-700 block py-1"
              :class="{ 'pl-4': link.depth === 2, 'pl-8': link.depth === 3 }"
            >
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <KunNull v-if="!toc" description="本页面无目录" />
    </div>
  </aside>
</template>
